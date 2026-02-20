import type { ReactNode } from "react";
import { Crown, Medal, Trophy } from "lucide-react";

type Level = "bronze" | "silver" | "gold";

interface MedalAchievementProps {
  icon: ReactNode;
  title: string;
  description: string;
  level?: Level;
  unlocked?: boolean;
}

export function MedalAchievement({
  icon,
  title,
  description,
  level = "gold",
  unlocked = true,
}: MedalAchievementProps) {
  const levelStyles = {
    bronze: {
      medal: "from-amber-600 to-amber-800",
      ribbon: "from-amber-700 to-amber-900",
      glow: "shadow-[0_0_30px_rgba(180,83,9,0.4)]",
    },
    silver: {
      medal: "from-gray-300 to-gray-500",
      ribbon: "from-gray-400 to-gray-600",
      glow: "shadow-[0_0_30px_rgba(156,163,175,0.4)]",
    },
    gold: {
      medal: "from-yellow-400 to-yellow-600",
      ribbon: "from-yellow-500 to-yellow-700",
      glow: "shadow-[0_0_30px_rgba(250,204,21,0.4)]",
    },
  };

  const styles = levelStyles[level];

  return (
    <div className="flex flex-col items-center group">
      {/* RIBBON */}
      <div
        className={`
          w-6 h-12
          bg-gradient-to-b ${styles.ribbon}
          rounded-b-md
        `}
      />

      {/* MEDAL */}
      <div
        className={`
          relative
          w-28 h-28
          rounded-full
          bg-gradient-to-br ${styles.medal}
          flex items-center justify-center
          border-4 border-white/20
          transition-all duration-300
          ${unlocked ? styles.glow : "opacity-40 grayscale"}
          group-hover:scale-105
        `}
      >
        <div className="text-white">{icon}</div>
      </div>

      {/* TEXT */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
