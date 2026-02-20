import { Dumbbell, Flame, ListChecks, Ellipsis } from "lucide-react";
import StatCard from "./stat-card";

export default function StatsToday() {
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
          value="3"
          suffix="/ 3"
          color="emerald"
        />

        <StatCard
          icon={<ListChecks className="text-orange-400 w-5 h-5" />}
          title="Total Sets"
          value="12"
          color="orange"
        />

        <StatCard
          icon={<Flame className="text-red-400 w-5 h-5" />}
          title="Calories"
          value="450"
          suffix="kcal"
          color="red"
        />
      </div>
    </div>
  );
}
