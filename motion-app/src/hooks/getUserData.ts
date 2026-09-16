import { db } from "@/services/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function getUserData(uid: string) {
  const userRef = doc(db, "users", uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) return null

  return snapshot.data()
}