import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div>
      <header className="top-0 left-0 w-full z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Skeleton className="w-9 h-9 rounded-3xl bg-zinc-800/60" />

            {/* Greeting */}
            <Skeleton className="h-4 w-40 bg-zinc-800/60" />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            {/* Streak Badge */}
            <Skeleton className="h-8 w-20 rounded-full bg-zinc-800/60" />

            {/* Notification */}
            <div className="relative">
              <Skeleton className="h-5 w-5 bg-zinc-800/60" />
              <Skeleton className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-700/60" />
            </div>

            {/* Avatar */}
            <Skeleton className="w-9 h-9 rounded-full bg-zinc-800/60" />
          </div>
        </div>
      </header>
      <div className="p-6">
        {/* TOP SECTION */}
        <div className="flex gap-8 w-full">
          {/* WEEKLY CALENDAR */}
          <Card className="rounded-2xl bg-neutral-900 border border-white/10 w-[70%]">
            <CardContent className="grid gap-6 p-6">
              <Skeleton className="h-8 w-64 bg-zinc-800/60" />

              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-4 rounded-xl bg-neutral-800"
                  >
                    <Skeleton className="h-3 w-8 bg-zinc-700/60 mb-2" />
                    <Skeleton className="h-5 w-6 bg-zinc-700/60 mb-2" />
                    <Skeleton className="h-6 w-6 rounded-full bg-zinc-700/60" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* WEEKLY PROGRESS */}
          <Card className="w-[30%] bg-neutral-900 border border-white/10">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-32 bg-zinc-800/60" />
                <Skeleton className="h-5 w-16 bg-zinc-800/60" />
              </div>

              <Skeleton className="h-3 w-full rounded-full bg-zinc-800/60" />
            </CardContent>
          </Card>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex gap-8 w-full">
          {/* TODAY WORKOUTS */}
          <Card className="mt-8 w-[70%] bg-neutral-900 border border-white/10">
            <CardContent className="p-6 space-y-8">
              <div className="space-y-3">
                <Skeleton className="h-8 w-72 bg-zinc-800/60" />
                <Skeleton className="h-4 w-40 bg-zinc-800/60" />
              </div>

              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-6 rounded-xl bg-neutral-800"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-14 w-14 rounded-md bg-zinc-700/60" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 bg-zinc-700/60" />
                      <Skeleton className="h-4 w-24 bg-zinc-700/60" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <Skeleton className="h-8 w-24 rounded-full bg-zinc-700/60" />
                    <Skeleton className="h-12 w-12 rounded-full bg-zinc-700/60" />
                    <Skeleton className="h-5 w-5 bg-zinc-700/60" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* STATS TODAY */}
          <Card className="mt-8 w-[30%] bg-neutral-900 border border-white/10">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32 bg-zinc-800/60" />
                <Skeleton className="h-6 w-6 bg-zinc-800/60" />
              </div>

              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-xl bg-neutral-800"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-md bg-zinc-700/60" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24 bg-zinc-700/60" />
                      <Skeleton className="h-6 w-16 bg-zinc-700/60" />
                    </div>
                  </div>

                  <Skeleton className="h-5 w-5 bg-zinc-700/60" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ACHIEVEMENTS */}
        <Card className="mt-8 bg-neutral-900 border border-white/10">
          <CardContent className="p-6 space-y-8">
            <Skeleton className="h-8 w-56 bg-zinc-800/60" />

            <div className="flex gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <Skeleton className="w-5 h-12 rounded-b-md bg-zinc-700/60" />
                  <Skeleton className="w-24 h-24 rounded-full bg-zinc-700/60" />
                  <Skeleton className="h-4 w-20 bg-zinc-700/60" />
                  <Skeleton className="h-3 w-16 bg-zinc-700/60" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
