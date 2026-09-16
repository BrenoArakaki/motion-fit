import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import type { User } from "firebase/auth"
import type { UserData } from "../types/user"

export async function createUserIfNotExists(user: User) {
  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    const userData: UserData = {
      name: user.displayName ?? "",
      email: user.email ?? "",
      streak: 0,
      createdAt: new Date(),
        week: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
}
    }

    await setDoc(userRef, userData)
  }
}   