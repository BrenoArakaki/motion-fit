import { MedalAchievement } from "@/components/achievement-card";
import StatsToday from "@/components/stats-today";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WeeklyProgress from "@/components/weekly-progress";
import WorkoutCard from "@/components/workout-card";
import { Check, Crown, Flame, Plus, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import type { Exercise } from "@/types/workout";
import {
  createTodayWorkout,
  addExercise,
  getExercises,
  getWeekWorkouts,
  updateExercise,
  deleteExercise,
} from "@/services/workoutServices";
import { getAchievements } from "@/services/achievementServices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ExerciseWithId = Exercise & { id: string };

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: "gold" | "silver" | "bronze";
  unlocked?: boolean;
}

const ICONS: Record<string, React.ReactElement> = {
  trophy: <Trophy size={32} />,
  flame: <Flame size={32} />,
  crown: <Crown size={32} />,
};

function Dashboard() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  // Formato local (YYYY-MM-DD) em vez de toISOString(), que usa UTC e
  // pode apontar pro dia errado dependendo do horário/fuso do usuário.
  const todayISO = today.toLocaleDateString("en-CA");

  const todayLabel = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Datas (YYYY-MM-DD) de domingo a sábado da semana atual, na mesma
  // ordem de `days`, pra cruzar com os documentos de workout.
  const weekDates = days.map((_, index) => {
    const date = new Date();
    date.setDate(todayDate - todayIndex + index);
    return date.toLocaleDateString("en-CA");
  });

  const [weekWorkouts, setWeekWorkouts] = useState<Record<string, boolean>>({});
  const [workouts, setWorkouts] = useState<ExerciseWithId[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSets, setNewSets] = useState("4");
  const [newReps, setNewReps] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        await createTodayWorkout(uid);

        const [exercisesData, weekWorkoutsData, achievementsData] =
          await Promise.all([
            getExercises(uid, todayISO),
            getWeekWorkouts(uid, weekDates),
            getAchievements(uid),
          ]);

        setWorkouts(exercisesData);
        setWeekWorkouts(weekWorkoutsData);
        setAchievements(achievementsData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Não foi possível carregar seus dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, todayISO]);

  const weekMap: Record<(typeof days)[number], boolean | undefined> = {
    Sun: weekWorkouts[weekDates[0]],
    Mon: weekWorkouts[weekDates[1]],
    Tue: weekWorkouts[weekDates[2]],
    Wed: weekWorkouts[weekDates[3]],
    Thu: weekWorkouts[weekDates[4]],
    Fri: weekWorkouts[weekDates[5]],
    Sat: weekWorkouts[weekDates[6]],
  };

  const completedCount = Object.values(weekMap).filter(Boolean).length;

  const completedExercises = workouts.filter(
    (w) => w.status === "completed",
  ).length;
  const totalExercises = workouts.length;
  const totalSets = workouts.reduce((sum, w) => sum + (w.sets || 0), 0);

  // Estimativa simples até existir um jeito real de medir gasto calórico
  // (peso, duração, frequência cardíaca etc). Ajuste a constante conforme
  // achar mais realista pro seu tipo de treino.
  const KCAL_PER_SET = 8;
  const estimatedCalories = totalSets * KCAL_PER_SET;

  function resetForm() {
    setNewName("");
    setNewSets("4");
    setNewReps("");
  }

  async function handleAddExercise() {
    if (!user) return;
    if (!newName.trim() || !newReps.trim()) return;

    const uid = user.uid;
    const setsNumber = Number(newSets);

    setSaving(true);
    try {
      await addExercise(uid, todayISO, {
        name: newName.trim(),
        sets: Number.isFinite(setsNumber) && setsNumber > 0 ? setsNumber : 1,
        reps: newReps.trim(),
        progress: 0,
        status: "pending", // valores válidos: "pending" | "in_progress" | "completed"
      });

      const updated = await getExercises(uid, todayISO);
      setWorkouts(updated);
      setDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error("Failed to add exercise:", err);
      setError("Não foi possível adicionar o exercício.");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(
    exerciseId: string,
    status: Exercise["status"],
    progress: number,
  ) {
    if (!user) return;
    const uid = user.uid;

    setWorkouts((prev) =>
      prev.map((w) => (w.id === exerciseId ? { ...w, status, progress } : w)),
    );

    try {
      await updateExercise(uid, todayISO, exerciseId, { status, progress });
    } catch (err) {
      console.error("Failed to update exercise:", err);
      setError("Não foi possível atualizar o exercício.");
      // Desfaz a atualização otimista buscando o estado real
      const updated = await getExercises(uid, todayISO);
      setWorkouts(updated);
    }
  }

  async function handleDeleteExercise(exerciseId: string) {
    if (!user) return;
    const uid = user.uid;

    const previous = workouts;
    setWorkouts((prev) => prev.filter((w) => w.id !== exerciseId));

    try {
      await deleteExercise(uid, todayISO, exerciseId);
    } catch (err) {
      console.error("Failed to delete exercise:", err);
      setError("Não foi possível excluir o exercício.");
      setWorkouts(previous);
    }
  }

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex gap-8 w-full">
        <Card className="rounded-2xl bg-neutral-900 border border-white/10 w-[70%]">
          <CardContent className="grid gap-4">
            <h1 className="text-3xl font-semibold">Weekly Calendar</h1>
            <div className="grid grid-cols-7 gap-4">
              {days.map((day, index) => {
                const isToday = index === todayIndex;
                const isCompleted = weekMap[day];
                const dayNumber = weekDates[index].split("-")[2];

                return (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center py-4 rounded-xl transition-all duration-300
      ${
        isToday
          ? "bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-800 text-white shadow-lg shadow-emerald-500/30"
          : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
      }`}
                  >
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {day}
                    </span>

                    <span className="text-lg font-semibold mt-1">
                      {Number(dayNumber)}
                    </span>

                    {isCompleted && (
                      <div
                        className={
                          isToday
                            ? "mt-2 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-white"
                            : "mt-2 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40"
                        }
                      >
                        <Check
                          size={14}
                          className={
                            isToday ? "text-emerald-600" : "text-emerald-400"
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[30%]">
          <CardContent className="p-6 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Keep Going
                </h2>
              </div>
            </div>

            <WeeklyProgress completed={completedCount} total={7} />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-8 w-full">
        <Card className="mt-8 mx-auto w-[70%]">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-semibold capitalize">
                  {todayLabel}
                </h1>
                <p className="text-zinc-400 mt-2">Today's Exercises</p>
              </div>
              <Button
                onClick={() => setDialogOpen(true)}
                className="
    gap-2
    h-12
    px-7
    rounded-2xl
    text-white
    font-semibold
    bg-gradient-to-r
    from-emerald-600
    to-emerald-700
    shadow-lg
    shadow-emerald-500/25
    hover:shadow-emerald-400/40
    hover:from-emerald-500
    hover:to-emerald-400
    transition-all duration-300
  "
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                Add Workout
              </Button>
            </div>
            <div className="grid md:grid-cols-1 gap-6 mt-8 max-h-[400px] overflow-y-auto pr-2">
              {loading ? (
                <p className="text-zinc-500">Carregando exercícios...</p>
              ) : workouts.length === 0 ? (
                <p className="text-zinc-500">Nenhum exercício hoje ainda.</p>
              ) : (
                workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteExercise}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="mt-8 w-[30%]">
          <CardContent>
            <StatsToday
              completedExercises={completedExercises}
              totalExercises={totalExercises}
              totalSets={totalSets}
              estimatedCalories={estimatedCalories}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Achievements</h1>
          <div className="flex gap-6">
            {loading ? (
              <p className="text-zinc-500">Carregando conquistas...</p>
            ) : achievements.length === 0 ? (
              <p className="text-zinc-500">Nenhuma conquista ainda.</p>
            ) : (
              achievements.map((a) => (
                <MedalAchievement
                  key={a.id}
                  icon={ICONS[a.icon] ?? <Trophy size={32} />}
                  title={a.title}
                  description={a.description}
                  level={a.level}
                  unlocked={a.unlocked}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar exercício</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="exercise-name">Nome do exercício</Label>
              <Input
                id="exercise-name"
                placeholder="Ex: Supino reto"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="exercise-sets">Séries</Label>
                <Input
                  id="exercise-sets"
                  type="number"
                  min={1}
                  value={newSets}
                  onChange={(e) => setNewSets(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="exercise-reps">Repetições</Label>
                <Input
                  id="exercise-reps"
                  placeholder="Ex: 8-10 reps"
                  value={newReps}
                  onChange={(e) => setNewReps(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddExercise}
              disabled={saving || !newName.trim() || !newReps.trim()}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              {saving ? "Salvando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
