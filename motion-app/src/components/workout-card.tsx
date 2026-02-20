import { Dumbbell, Ellipsis } from "lucide-react";
import ProgressCircle from "./progressbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

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
      className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:bg-white/5 transition-all
      "
    >
      <div className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex space-y-2 gap-2 items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <Dumbbell size={28} className="text-emerald-400" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold uppercase tracking-wide">
              {name}
            </h2>
            <p className="text-zinc-400 text-sm">{sets}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* STATUS BADGE */}
          <Badge
            className={`
      h-8 px-4
      rounded-full
      text-xs font-semibold tracking-wide
      backdrop-blur-md
      ${getStatusColor()}
    `}
          >
            {getStatus()}
          </Badge>

          {/* PROGRESS */}
          <div className="p-2">
            <ProgressCircle progress={progress} />
          </div>

          {/* MENU BUTTON */}
          <Button variant="ghost" size="icon">
            <Ellipsis size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
