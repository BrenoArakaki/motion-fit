export default function WeeklyProgress({ completed = 5, total = 7 }) {
  const progress = (completed / total) * 100;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-neutral-300 font-medium">Weekly Progress</h3>
        <span className="text-neutral-400 text-sm">
          {completed}/{total} Workouts
        </span>
      </div>

      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
