import React from 'react';
import { Timestamp } from 'firebase/firestore';

export interface Option {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface StoryParams {
  name: string;
  age: string;
  character: Option | null;
  setting: Option | null;
  moral: Option | null;
  plot: string;
}

export interface GeneratedStory {
  id: string;
  title: string;
  story: string;
  imageBlob: Blob;
  localImageUrl: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string | null;
}

export interface SavedStory {
    id: string;
    userId: string;
    title: string;
    story: string;
    imageUrl: string;
    createdAt: Timestamp;
}

export interface AppConfig {
    API_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID?: string;
}

declare global {
    interface Window {
        APP_CONFIG: AppConfig;
    }
}