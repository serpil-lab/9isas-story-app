import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { auth, db, storage } from '../firebase';
import { 
  onIdTokenChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  User,
  reload
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserProfile, SavedStory, GeneratedStory } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  savedStories: SavedStory[];
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  saveStory: (story: GeneratedStory) => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [savedStories, setSavedStories] = useState<SavedStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user profile
        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setUserProfile(profileSnap.data() as UserProfile);
        }
        // Fetch saved stories
        const storiesQuery = query(collection(db, "stories"), where("userId", "==", currentUser.uid));
        const storiesSnapshot = await getDocs(storiesQuery);
        const stories = storiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedStory));
        setSavedStories(stories);
      } else {
        setUserProfile(null);
        setSavedStories([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "profiles", userCredential.user.uid), {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || email.split('@')[0],
    });
    await sendEmailVerification(userCredential.user);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  
  const saveStory = async (story: GeneratedStory) => {
      if (!user) throw new Error("You must be logged in to save a story.");

      setLoading(true);
      try {
          // 1. Upload image to Firebase Storage
          const imageRef = ref(storage, `story-images/${user.uid}/${story.id}.jpg`);
          await uploadBytes(imageRef, story.imageBlob);
          const imageUrl = await getDownloadURL(imageRef);

          // 2. Save story metadata to Firestore
          const storyRef = doc(db, "stories", story.id);
          const newStoryData = {
              userId: user.uid,
              title: story.title,
              story: story.story,
              imageUrl,
              createdAt: serverTimestamp(),
          };
          await setDoc(storyRef, newStoryData);
          
          // 3. Update local state optimistically
          const newStoryForState: SavedStory = {
              id: story.id,
              userId: user.uid,
              title: story.title,
              story: story.story,
              imageUrl,
              createdAt: Timestamp.now() // Use client-side timestamp for immediate UI update
          };
          setSavedStories(prev => [...prev, newStoryForState]);

      } catch (error) {
          console.error("Error saving story:", error);
          throw error;
      } finally {
          setLoading(false);
      }
  };
  
  const reloadUser = async () => {
    if (auth.currentUser) {
        await reload(auth.currentUser);
    }
  };


  const value = {
    user,
    userProfile,
    loading,
    savedStories,
    signUp,
    signIn,
    logOut,
    saveStory,
    reloadUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};