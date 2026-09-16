import {
  doc,
  setDoc,
  collection,
  updateDoc,
  addDoc,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  query, where, documentId,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Workout, Exercise } from "../types/workout"

// Criar treino do dia
export async function createTodayWorkout(uid: string) {
  const today = new Date().toLocaleDateString("en-CA")

  const workout: Workout = {
    date: today,
    completed: false,
    totalSets: 0,
    calories: 0
  }

  await setDoc(doc(db, "users", uid, "workouts", today), workout)
}

// Adicionar exercício
export async function addExercise(
  uid: string,
  date: string,
  exercise: Exercise
) {
  await addDoc(
    collection(db, "users", uid, "workouts", date, "exercises"),
    exercise
  )
}

// Buscar exercícios
export async function getExercises(uid: string, date: string) {
  const snapshot = await getDocs(
    collection(db, "users", uid, "workouts", date, "exercises")
  )

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (Exercise & { id: string })[]
}

/**
 * Recebe uma lista de datas (formato "YYYY-MM-DD") e retorna quais
 * delas já têm um documento de workout criado — ou seja, o usuário
 * "logou" naquele dia.
 */
export async function getWeekWorkouts(
  uid: string,
  dates: string[]
): Promise<Record<string, boolean>> {
  if (dates.length === 0) return {};

  const ref = collection(db, "users", uid, "workouts");
  const q = query(ref, where(documentId(), "in", dates));
  const snapshot = await getDocs(q);

  const result: Record<string, boolean> = {};
  snapshot.docs.forEach((doc) => {
    result[doc.id] = true;
  });

  return result;
}
/**
 * Atualiza campos de um exercício específico (ex: status e progress
 * ao marcar como em progresso/concluído).
 */
export async function updateExercise(
  uid: string,
  date: string,
  exerciseId: string,
  updates: Partial<Exercise>
) {
  await updateDoc(
    doc(db, "users", uid, "workouts", date, "exercises", exerciseId),
    updates
  );
}

/**
 * Remove um exercício específico do treino do dia.
 */
export async function deleteExercise(
  uid: string,
  date: string,
  exerciseId: string
) {
  await deleteDoc(
    doc(db, "users", uid, "workouts", date, "exercises", exerciseId)
  );
}
/**
 * Calcula o streak (dias seguidos com workout registrado, incluindo hoje)
 * a partir dos documentos reais em users/{uid}/workouts — sem depender
 * de um contador manual salvo em outro lugar.
 */
export async function getStreak(uid: string): Promise<number> {
  const ref = collection(db, "users", uid, "workouts");
  // Como os IDs dos documentos são datas "YYYY-MM-DD", a ordenação
  // lexicográfica por documentId() é a mesma ordenação cronológica.
  const q = query(ref, orderBy(documentId(), "desc"), limit(60));
  const snapshot = await getDocs(q);

  const dates = new Set(snapshot.docs.map((doc) => doc.id));

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const iso = cursor.toLocaleDateString("en-CA");
    if (!dates.has(iso)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}