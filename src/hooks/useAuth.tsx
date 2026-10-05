"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseErrorMessage, getFirebaseAuth, missingFirebaseConfig } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!missingFirebaseConfig());
  const [error, setError] = useState<string | null>(null);
  const configError = missingFirebaseConfig() ? "缺少 Firebase 環境變數。" : null;

  useEffect(() => {
    if (missingFirebaseConfig()) return;
    return onAuthStateChanged(getFirebaseAuth(), (next) => {
      setUser(next);
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
      return true;
    } catch (caught) {
      setError(firebaseErrorMessage(caught, "註冊失敗，請稍後再試。"));
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      return true;
    } catch (caught) {
      setError(firebaseErrorMessage(caught, "登入失敗，請稍後再試。"));
      return false;
    }
  };

  const logOut = async () => {
    setError(null);
    await signOut(getFirebaseAuth());
  };

  return (
    <AuthContext.Provider value={{ user, loading, error: error ?? configError, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth 必須在 AuthProvider 內使用");
  return value;
}
