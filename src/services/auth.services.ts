import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@configs/firebase.config";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const login = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("rememberedUser");
    }

    return user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent.");
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error;
  }
};
