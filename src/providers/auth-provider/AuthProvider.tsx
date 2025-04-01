import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@configs/firebase.config";
import {
  login,
  logout as firebaseLogout,
  signUp,
  forgotPassword,
  signInWithGoogle,
} from "@services/auth.services";
import { useSelector, useDispatch } from "react-redux";
import { getToken, getUser, logout as reduxLogout } from "@redux/slices/auth.slice";

interface AuthContextType {
  // Only the advanced backend user is returned.
  user: any;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<FirebaseUser>;
  signUp: (email: string, password: string) => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<FirebaseUser>;
  token: string;
  firebaseUser: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const reduxToken = useSelector(getToken);
  const reduxUser = useSelector(getUser);
  const user = reduxUser ? reduxUser : null;
  const isLoggedIn = reduxUser !== null;
  console.log(isLoggedIn);

  const token = reduxToken || "";

  // Custom logout function that handles both Firebase and Redux logout.
  const handleLogout = async (): Promise<void> => {
    try {
      await firebaseLogout(); // Firebase logout
      dispatch(reduxLogout()); // Clear Redux auth state
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signUp,
        logout: handleLogout,
        forgotPassword,
        isLoggedIn,
        signInWithGoogle,
        token,
        firebaseUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
