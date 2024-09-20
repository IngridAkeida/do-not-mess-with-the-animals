'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  User,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  updateUserProfile: (profileData: {
    displayName: string | null;
    photoURL?: string | null;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (profileData: {
    displayName: string | null;
    photoURL?: string | null;
  }) => {
    if (user) {
      try {
        await firebaseUpdateProfile(user, profileData);
        setUser({
          ...user,
          displayName: profileData.displayName || user.displayName,
          photoURL: profileData.photoURL || user.photoURL,
        });
      } catch (error) {
        console.error('Erro ao atualizar o perfil: ', error);
      }
    } else {
      throw new Error('No user is currently signed in.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
