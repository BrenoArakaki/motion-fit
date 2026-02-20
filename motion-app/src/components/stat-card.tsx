import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  suffix?: string;
  color: "emerald" | "orange" | "red";
}

export default function StatCard({
  icon,
  title,
  value,
  suffix,
  color,
}: StatCardProps) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:bg-white/5 transition-all">
      <div className="flex items-center gap-4">
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${
              color === "emerald"
                ? "bg-emerald-500/10"
                : color === "orange"
                  ? "bg-orange-500/10"
                  : "bg-red-500/10"
            }
          `}
        >
          {icon}
        </div>

        <div>
          <p className="text-neutral-400 text-sm">{title}</p>
          <p className="text-2xl font-semibold text-white">
            {value}{" "}
            {suffix && (
              <span className="text-neutral-400 text-lg">{suffix}</span>
            )}
          </p>
        </div>
      </div>

      <span className="text-neutral-500 text-xl">
        <ChevronRight size={16} />
      </span>
    </div>
  );
}
