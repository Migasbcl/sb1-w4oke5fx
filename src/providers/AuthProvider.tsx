import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthContext } from '../contexts/AuthContext';
import type { User, LoginCredentials, RegisterData, AuthState } from '../types/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data() as Omit<User, 'id'>;
        
        setState({
          user: {
            id: firebaseUser.uid,
            ...userData
          },
          loading: false,
          error: null
        });
      } else {
        setState({
          user: null,
          loading: false,
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data() as Omit<User, 'id'>;

      setState({
        user: {
          id: firebaseUser.uid,
          ...userData
        },
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Falha ao fazer login'
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userData: Omit<User, 'id'> = {
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      setState({
        user: {
          id: firebaseUser.uid,
          ...userData
        },
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Falha ao registrar'
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setState({
        user: null,
        loading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Falha ao sair'
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};