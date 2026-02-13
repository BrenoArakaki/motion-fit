import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { auth } from "@/services/firebase";

const provider = new GoogleAuthProvider();

export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result.user
  } catch (error) {
    console.error(error);
    throw error;
  }
}
