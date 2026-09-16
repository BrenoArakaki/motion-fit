import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // "trophy" | "flame" | "crown" | ...
  level: "gold" | "silver" | "bronze";
  unlocked?: boolean;
}

/**
 * Busca as conquistas do usuário em users/{uid}/achievements.
 *
 * A criação/desbloqueio de cada achievement (ex: streak de 7 dias,
 * PR de deadlift) deve acontecer em outro lugar — idealmente uma
 * Cloud Function disparada quando um treino é registrado, não aqui.
 * Este service só lê o que já está salvo.
 */
export async function getAchievements(uid: string): Promise<Achievement[]> {
  const snapshot = await getDocs(collection(db, "users", uid, "achievements"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      icon: data.icon,
      level: data.level,
      unlocked: data.unlocked,
    };
  });
}
