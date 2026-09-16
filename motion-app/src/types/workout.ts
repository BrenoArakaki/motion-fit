export interface Workout {
  date: string
  completed: boolean
  totalSets: number
  calories: number
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  progress: number
  status: "pending" | "in_progress" | "completed"
}