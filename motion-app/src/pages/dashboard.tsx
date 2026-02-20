import { MedalAchievement } from "@/components/achievement-card";
import StatsToday from "@/components/stats-today";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WeeklyProgress from "@/components/weekly-progress";
import WorkoutCard from "@/components/workout-card";
import { BicepsFlexed, Car, Check, Crown, Flame, Trophy } from "lucide-react";

function Dashboard() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  // Exemplo de dias completados (datas do mês)
  const completedDates = [17, 16, 19];

  const workouts = [
    { name: "Squat", sets: "4 sets • 6-8 reps", progress: 80 },
    { name: "Bench Press", sets: "4 sets • 6-8 reps", progress: 100 },
    { name: "Deadlift", sets: "4 sets • 6-8 reps", progress: 80 },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-8 w-full">
        <Card className="rounded-2xl bg-neutral-900 border border-white/10 w-[70%]">
          <CardContent className="grid gap-4">
            <h1 className="text-3xl font-semibold">Weekly Calendar</h1>
            <div className="grid grid-cols-7 gap-4">
              {days.map((day, index) => {
                // calcula o número correto do dia da semana atual
                const date = new Date();
                date.setDate(todayDate - todayIndex + index);

                const isToday = index === todayIndex;
                const isCompleted = completedDates.includes(date.getDate());

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
                    {/* Nome do dia */}
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {day}
                    </span>

                    {/* Número do dia */}
                    <span className="text-lg font-semibold mt-1">
                      {date.getDate()}
                    </span>

                    {/* Check */}
                    {isCompleted && (
                      <div
                        className={
                          isToday
                            ? "mt-2 flex items-center justify-center w-6 h-6 rounded-full bg-white-500 border border-white"
                            : "mt-2 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40"
                        }
                      >
                        <Check
                          size={14}
                          className={
                            isToday ? "text-white" : "text-emerald-400"
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
          <CardContent className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Keep Going
                </h2>
              </div>
            </div>

            {/* PROGRESS */}
            <WeeklyProgress completed={3} total={7} />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-8 w-full">
        <Card className="mt-8 mx-auto w-[70%]">
          <CardContent>
            <h1 className="text-3xl font-semibold">
              Friday, April {todayDate}
            </h1>
            <p className="text-zinc-400 mt-2">Today's Exercises</p>

            <div className="grid md:grid-cols-1 gap-6 mt-8">
              {workouts.map((workout, i) => (
                <WorkoutCard key={i} {...workout} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mt-8 w-[30%]">
          <CardContent>
            <StatsToday />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardContent className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Achievements</h1>
          <div className="flex gap-6">
            <MedalAchievement
              icon={<Trophy size={32} />}
              title="Deadlift PR"
              description="120kg Personal Record"
              level="gold"
            />
            <MedalAchievement
              icon={<Flame size={32} />}
              title="7 Day Streak"
              description="Consistency Master"
              level="silver"
            />
            <MedalAchievement
              icon={<Crown size={32} />}
              title="Elite Athlete"
              description="50 Workouts Completed"
              level="bronze"
              unlocked={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
