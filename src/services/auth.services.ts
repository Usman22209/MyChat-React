import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@configs/firebase.config";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    console.log("Verification email sent");

    return user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const login = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error("Your email is not verified. Please check your inbox.");
    }

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
    console.log(email);

    const response = await sendPasswordResetEmail(auth, email);
    console.log(response);

    console.log("Password reset email sent.");
  } catch (error) {
    console.error("Forgot Password Error:", error);
    throw error;
  }
};
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.emailVerified) {
      throw new Error("Your email is not verified. Please check your inbox.");
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
