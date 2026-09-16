import { Dumbbell, Flame, ListChecks, Ellipsis, Heart } from "lucide-react";
import StatCard from "./stat-card";

interface StatsTodayProps {
  completedExercises: number;
  totalExercises: number;
  totalSets: number;
  estimatedCalories: number;
}

export default function StatsToday({
  completedExercises,
  totalExercises,
  totalSets,
  estimatedCalories,
}: StatsTodayProps) {
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <h2 className="text-xl font-semibold text-white">Stats Today</h2>
        </div>

        <button className="p-2 rounded-lg hover:bg-white/5 transition">
          <Ellipsis className="text-neutral-400 w-5 h-5" />
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <StatCard
          icon={<Dumbbell className="text-emerald-400 w-5 h-5" />}
          title="Workouts"
          value={String(completedExercises)}
          suffix={`/ ${totalExercises}`}
          color="emerald"
        />

        <StatCard
          icon={<ListChecks className="text-orange-400 w-5 h-5" />}
          title="Total Sets"
          value={String(totalSets)}
          color="orange"
        />

        <StatCard
          icon={<Flame className="text-red-400 w-5 h-5" />}
          title="Calories"
          value={String(estimatedCalories)}
          suffix="kcal (est.)"
          color="red"
        />
      </div>

      {/* Upcoming — ainda estático: não existe feature de agendamento
          de treino no banco hoje. Se quiser isso funcionando de verdade,
          precisa de uma coleção nova (ex: users/{uid}/scheduled) com
          data/hora e tipo de treino. */}
      <div className="flex items-center gap-3 mt-6">
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
        </div>
        <h2 className="text-xl font-semibold text-white">Upcoming</h2>
      </div>
      <StatCard
        icon={<Heart className="text-red-400 w-5 h-5" />}
        title="Cardio"
        value="10:30"
        suffix="pm"
        color="red"
      />
    </div>
  );
}
