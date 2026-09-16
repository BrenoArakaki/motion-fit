import { Bell, Flame } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import MotionLogo from "@/assets/MotionLogo.png";
import { Badge } from "./ui/badge";
import { getStreak } from "@/services/workoutServices";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useAuth();

  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    async function loadStreak() {
      if (!user) return;

      const currentStreak = await getStreak(user.uid);
      setStreak(currentStreak);
    }

    loadStreak();
  }, [user]);

  return (
    <header className="top-0 left-0 w-full z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-white/20">
      <div className="mx-auto px-8 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-9 h-9">
            <img className="rounded-3xl" src={MotionLogo} />
          </div>
          {/* Greeting */}
          {user && (
            <span className="text-sm text-neutral-400">
              👋 Hi,{" "}
              <span className="text-white font-medium">{user.displayName}</span>
            </span>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* Streak Badge */}
          <Badge className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Flame size={16} className="text-orange-400" />
            <span className="text-xs text-orange-300 font-medium">
              {streak ?? 0} days
            </span>
          </Badge>

          {/* Notification */}
          <button className="relative text-neutral-400 hover:text-white transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border- white/10 hover:scale-105 transition"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
              {user?.displayName?.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
