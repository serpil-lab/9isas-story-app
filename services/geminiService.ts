import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StoryParams, GeneratedStory } from '../types';

if (!window.APP_CONFIG || !window.APP_CONFIG.API_KEY) {
    throw new Error("Gemini API_KEY is not configured. Please check your deployment secrets.");
}

const ai = new GoogleGenAI({ apiKey: window.APP_CONFIG.API_KEY });

const generateStoryPrompt = (params: StoryParams): string => `
  You are a magical storyteller for children, writing for a brand called "9isas". Your task is to write a short, enchanting story for a child named ${params.name || 'a brave adventurer'}, who is ${params.age || 'young'} years old.

  The story must feature:
  - Main Character: A ${params.character?.name || 'mysterious hero'}
  - Setting: The story takes place in a ${params.setting?.name || 'wondrous land'}.
  - Moral of the story: It should subtly teach a lesson about ${params.moral?.name || 'being good'}.
  - Core Plot Idea: The story should be about "${params.plot || 'a surprising adventure'}".

  Please adhere to the following rules:
  1. The story should be positive, imaginative, and appropriate for a ${params.age || 'young'}-year-old child.
  2. The story should be around 200-300 words long.
  3. If provided, the child's name, "${params.name}", must be mentioned in the story.
  4. Respond ONLY with a JSON object in the following format:
  {
    "title": "A short, catchy title for the story",
    "story": "The full text of the story."
  }
`;

const generateImagePrompt = (title: string, params: StoryParams): string => `
  A whimsical, storybook illustration for a children's story created by "9isas", titled "${title}".
  The scene features a ${params.character?.name || 'hero'} in a ${params.setting?.name || 'magical place'}.
  The style should be dreamy, digital art, with vibrant but soft colors, and a magical atmosphere, suitable for a dark, enchanting theme.
`;

export const generateStoryAndImage = async (params: StoryParams): Promise<Omit<GeneratedStory, 'localImageUrl'>> => {
  try {
    const storyPrompt = generateStoryPrompt(params);
    const storyResponse: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: storyPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    let jsonStr = storyResponse.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const storyData: { title: string; story: string; } = JSON.parse(jsonStr);

    const imagePrompt = generateImagePrompt(storyData.title, params);
    const imageResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: imagePrompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (!imageResponse.generatedImages || imageResponse.generatedImages.length === 0) {
      throw new Error("Image generation failed to produce an image.");
    }

    const base64ImageBytes: string = imageResponse.generatedImages[0].image.imageBytes;
    
    const fetchRes = await fetch(`data:image/jpeg;base64,${base64ImageBytes}`);
    const imageBlob = await fetchRes.blob();

    return {
      id: crypto.randomUUID(),
      title: storyData.title,
      story: storyData.story,
      imageBlob: imageBlob,
    };
  } catch (error) {
    console.error("Error generating story and image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to create your story: ${error.message}`);
    }
    throw new Error("An unknown error occurred while creating your story.");
  }
};