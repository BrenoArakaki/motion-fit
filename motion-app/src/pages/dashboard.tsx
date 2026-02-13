import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WorkoutCard from "@/components/workout-card";
import { Check } from "lucide-react";

function Dashboard() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const todayIndex = today.getDay();
  const todayDate = today.getDate();

  // Exemplo de dias completados (datas do mês)
  const completedDates = [10, 11, 12];

  const workouts = [
    { name: "Squat", sets: "4 sets • 6-8 reps", progress: 80 },
    { name: "Bench Press", sets: "4 sets • 6-8 reps", progress: 100 },
    { name: "Deadlift", sets: "4 sets • 6-8 reps", progress: 80 },
  ];

  return (
    <div className="p-6">
      <Card className=" rounded-2xl bg-neutral-900 border border-white/10">
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
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
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
                        className={isToday ? "text-white" : "text-emerald-400"}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 mx-auto ">
        <CardContent>
          <h1 className="text-3xl font-semibold">Friday, April 13</h1>
          <p className="text-zinc-400 mt-2">Today's Exercises</p>

          <div className="grid md:grid-cols-1 gap-6 mt-8">
            {workouts.map((workout, i) => (
              <WorkoutCard key={i} {...workout} />
            ))}
          </div>

          <Button
            className="mt-10 w-full bg-accent hover:bg-emerald-500 transition rounded-xl py-4 text-lg font-medium text-foreground"
            variant="outline"
          >
            + Add Workout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
