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
import { setToken } from "@redux/slices/auth.slice";
import { store } from "@redux/store";
import { logout as reduxLogout } from "@redux/slices/auth.slice";
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    console.log("Verification email sent");
    const token = await user.getIdToken();
    console.log(token);

    store.dispatch(setToken(token));

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

    const token = await user.getIdToken();
    store.dispatch(setToken(token));

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
    store.dispatch(reduxLogout());
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    console.log(email);
    await sendPasswordResetEmail(auth, email);
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

    const token = await user.getIdToken();
    store.dispatch(setToken(token));
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};
