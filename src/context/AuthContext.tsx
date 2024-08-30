'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { auth } from '../pages/firebaseData'; 

interface AuthContextType {
  user: User | null;
  updateUserProfile: (profileData: { displayName?: string; photoURL?: string | null }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (profileData: { displayName?: string; photoURL?: string }) => {
    if (user) {
      try {
        await firebaseUpdateProfile(user, profileData);
        setUser({
          ...user,
          displayName: profileData.displayName || user.displayName,
          photoURL: profileData.photoURL || user.photoURL
        });
      } catch (error) {
        console.error('Erro ao atualizar o perfil: ', error);
      }
    } else {
      throw new Error('No user is currently signed in.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUserProfile }}>
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
