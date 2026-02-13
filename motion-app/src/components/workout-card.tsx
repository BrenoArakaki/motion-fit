import { Dumbbell } from "lucide-react";
import ProgressCircle from "./progressbar";
import { Badge } from "./ui/badge";

interface Props {
  name: string;
  sets: string;
  progress: number;
}

export default function WorkoutCard({ name, sets, progress }: Props) {
  const getStatus = () => {
    if (progress === 100) return "Completed";
    if (progress > 0) return "In progress";
    return "Not started";
  };

  const getStatusColor = () => {
    if (progress === 100) return "bg-emerald-500/20 text-emerald-400";
    if (progress > 0) return "bg-yellow-500/20 text-yellow-400";
    return "bg-zinc-600/30 text-zinc-400";
  };

  return (
    <div
      className="
        bg-zinc-800/60
        backdrop-blur-xl
        border border-zinc-700
        hover:border-emerald-500/40
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:shadow-lg hover:shadow-emerald-500/10
      "
    >
      <div className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex space-y-2">
          <div className="p-2 rounded-lg  bg-zinc-700/60">
            <Dumbbell size={18} className="text-emerald-400" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-xl font-semibold uppercase tracking-wide">
              {name}
            </h2>
            <p className="text-zinc-400 text-sm">{sets}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex gap-2 items-center">
          {/* STATUS BADGE */}
          <Badge
            className={`
              h-8
                px-3
              font-medium
              rounded-full
              ${getStatusColor()}
            `}
          >
            {getStatus()}
          </Badge>
          <ProgressCircle progress={progress} />
        </div>
      </div>
    </div>
  );
}
