import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const generateCalendarData = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const calendarDays = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: "", habits: [] });
  }
  
  const habitCategories = [
    { name: "Meditation", color: "#8B5CF6" },
    { name: "Exercise", color: "#EC4899" },
    { name: "Reading", color: "#3B82F6" },
    { name: "Water", color: "#10B981" },
    { name: "Journal", color: "#F59E0B" }
  ];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayHabits = [];
    
    for (const habit of habitCategories) {
      const rand = Math.random();
      let status = 0;
      if (rand < 0.7) {
        status = rand < 0.5 ? 1 : 2;
        
        if (date >= new Date(today.setHours(0,0,0,0))) {
          status = 0;
        }
        
        if (status > 0) {
          dayHabits.push({
            name: habit.name,
            status: status,
            color: habit.color,
          });
        }
      }
    }
    
    calendarDays.push({
      day,
      habits: dayHabits,
      isToday: day === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
    });
  }
  
  return calendarDays;
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getHabitStreakFromStorage = (habitName) => {
  try {
    const userData = JSON.parse(localStorage.getItem('habitflow_habits_current'));
    if (userData) {
      const habit = userData.find(h => h.name === habitName);
      return habit ? habit.streak : 0;
    }
  } catch (e) {
    console.error("Error getting streak from storage", e);
  }
  return 0;
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarData, setCalendarData] = useState(generateCalendarData());
  const [selectedHabit, setSelectedHabit] = useState("All");
  const [viewMode, setViewMode] = useState("monthly");
  
  useEffect(() => {
    setCalendarData(generateCalendarData());
  }, [currentMonth, currentYear]);
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const habitFilters = [
    { name: "All", color: "#6B7280" },
    { name: "Meditation", color: "#8B5CF6" },
    { name: "Exercise", color: "#EC4899" },
    { name: "Reading", color: "#3B82F6" },
    { name: "Water", color: "#10B981" },
    { name: "Journal", color: "#F59E0B" },
  ];

  const generateWeeklyData = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = today.getDay();
    
    return weekDays.map((day, index) => {
      const isToday = index === currentDay;
      const isPast = index < currentDay;
      
      const completionData = habitFilters.slice(1).map(habit => {
        if (isPast) {
          return {
            name: habit.name,
            color: habit.color,
            completed: Math.random() > 0.3,
            streak: getHabitStreakFromStorage(habit.name)
          };
        }
        
        return {
          name: habit.name,
          color: habit.color,
          completed: false,
          pending: true,
          streak: getHabitStreakFromStorage(habit.name)
        };
      });
      
      return {
        day,
        isToday,
        isPast,
        completionData
      };
    });
  };
  
  const weeklyData = generateWeeklyData();
  
  const generateDailyData = () => {
    return habitFilters.slice(1).map(habit => {
      const completedCount = Math.floor(Math.random() * 10) + 5;
      const totalDays = 30;
      const percentage = (completedCount / totalDays) * 100;
      
      return {
        name: habit.name,
        color: habit.color,
        completedCount,
        totalDays,
        percentage,
        streak: getHabitStreakFromStorage(habit.name)
      };
    });
  };
  
  const dailyData = generateDailyData();
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Calendar View</h1>
        </header>
        
        <main className="p-6">
          <div className="card mb-6">
            <div className="mb-6">
              <Tabs defaultValue="monthly" value={viewMode} onValueChange={setViewMode}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center justify-between mb-6 mt-6">
                  <div className="flex items-center">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-1 mr-4 rounded-full hover:bg-muted"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-semibold flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      {viewMode === 'monthly' 
                        ? `${monthNames[currentMonth]} ${currentYear}`
                        : viewMode === 'weekly' 
                          ? 'This Week'
                          : 'Today\'s Habits'
                      }
                    </h2>
                    <button
                      onClick={goToNextMonth}
                      className="p-1 ml-4 rounded-full hover:bg-muted"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    {habitFilters.map((habit) => (
                      <button
                        key={habit.name}
                        onClick={() => setSelectedHabit(habit.name)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedHabit === habit.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: habit.color }}
                          ></span>
                          {habit.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-2 rounded-full bg-red-500"></div>
                    <span className="text-sm">Missed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                </div>
                
                <TabsContent value="monthly" className="mt-2">
                  <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div
                        key={day}
                        className="text-center font-medium text-sm py-2"
                      >
                        {day}
                      </div>
                    ))}
                    
                    {calendarData.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square border rounded-lg flex flex-col hover:shadow-md transition-shadow ${
                          day.isToday
                            ? "border-primary/50 bg-primary/5"
                            : "border-border"
                        } ${!day.day ? "bg-muted/30" : "cursor-pointer"}`}
                      >
                        {day.day && (
                          <>
                            <div className="p-2 text-right">
                              <span
                                className={`inline-block w-6 h-6 rounded-full text-sm ${
                                  day.isToday
                                    ? "bg-primary text-white"
                                    : ""
                                } flex items-center justify-center`}
                              >
                                {day.day}
                              </span>
                            </div>
                            <div className="flex-1 p-1">
                              <TooltipProvider>
                                <div className="flex flex-wrap gap-1">
                                  {day.habits
                                    .filter(
                                      (habit) =>
                                        selectedHabit === "All" ||
                                        habit.name === selectedHabit
                                    )
                                    .map((habit, hIndex) => (
                                      <Tooltip key={hIndex}>
                                        <TooltipTrigger asChild>
                                          <div
                                            className={`w-3 h-3 rounded-full transition-transform hover:scale-125 ${
                                              habit.status === 1
                                                ? "animate-pulse"
                                                : ""
                                            }`}
                                            style={{
                                              backgroundColor:
                                                habit.status === 1
                                                  ? "rgb(34, 197, 94)"
                                                  : "rgb(239, 68, 68)"
                                            }}
                                          ></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{habit.name}: {
                                            habit.status === 1 ? "Completed" : "Missed"
                                          }</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                </div>
                              </TooltipProvider>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="weekly" className="mt-2">
                  <div className="space-y-6">
                    {weeklyData.map((dayData, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          dayData.isToday ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        <h3 className="font-semibold mb-3 flex justify-between">
                          <span>{dayData.day}</span>
                          {dayData.isToday && (
                            <span className="text-sm bg-primary text-white px-2 py-0.5 rounded-full">Today</span>
                          )}
                        </h3>
                        
                        <div className="space-y-3">
                          {dayData.completionData
                            .filter(habit => selectedHabit === "All" || habit.name === selectedHabit)
                            .map((habit, hIndex) => (
                              <div key={hIndex} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: habit.color }}
                                  />
                                  <span>{habit.name}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  {habit.pending ? (
                                    <span className="text-sm text-muted-foreground">Pending</span>
                                  ) : (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center
                                      ${habit.completed 
                                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                                        : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                      }`}>
                                      {habit.completed ? '✓' : '✗'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="daily" className="mt-2">
                  <div className="space-y-6">
                    {dailyData
                      .filter(habit => selectedHabit === "All" || habit.name === selectedHabit)
                      .map((habit, index) => (
                        <div key={index} className="card space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span 
                                className="w-4 h-4 rounded-full mr-2" 
                                style={{ backgroundColor: habit.color }}
                              />
                              <span className="font-medium">{habit.name}</span>
                            </div>
                            
                            <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {habit.streak} day streak
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Monthly Progress</span>
                              <span>{habit.completedCount}/{habit.totalDays} days</span>
                            </div>
                            <Progress 
                              value={habit.percentage} 
                              className="h-2"
                            />
                          </div>
                          
                          <div className="pt-2 border-t">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Last completed</span>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
