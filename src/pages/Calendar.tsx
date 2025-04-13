
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

// Mock data for calendar view
const generateCalendarData = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: "", habits: [] });
  }
  
  // Generate random habit completion data
  const habitCategories = [
    { name: "Meditation", color: "#8B5CF6" }, // purple
    { name: "Exercise", color: "#EC4899" },   // pink
    { name: "Reading", color: "#3B82F6" },    // blue
    { name: "Water", color: "#10B981" },      // green
    { name: "Journal", color: "#F59E0B" }     // amber
  ];
  
  // Add cells for each day of the month with random habit data
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayHabits = [];
    
    // Generate random habit completion for the day
    for (const habit of habitCategories) {
      // Random status: 0 = not relevant for this day, 1 = completed, 2 = missed
      const rand = Math.random();
      let status = 0;
      if (rand < 0.7) { // 70% chance of the habit being relevant for this day
        status = rand < 0.5 ? 1 : 2; // 50/50 chance of completion
        
        // If it's today or a future day, set as pending (status 0)
        if (date >= new Date(today.setHours(0,0,0,0))) {
          status = 0;
        }
        
        if (status > 0) {
          dayHabits.push({
            name: habit.name,
            status: status, // 1 = completed, 2 = missed
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

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarData, setCalendarData] = useState(generateCalendarData());
  const [selectedHabit, setSelectedHabit] = useState("All");
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setCalendarData(generateCalendarData());
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setCalendarData(generateCalendarData());
  };
  
  // Dummy habit categories for filtering
  const habitFilters = [
    { name: "All", color: "#6B7280" },
    { name: "Meditation", color: "#8B5CF6" },
    { name: "Exercise", color: "#EC4899" },
    { name: "Reading", color: "#3B82F6" },
    { name: "Water", color: "#10B981" },
    { name: "Journal", color: "#F59E0B" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Calendar View</h1>
        </header>
        
        <main className="p-6">
          <div className="card mb-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={goToPreviousMonth}
                  className="p-1 mr-4 rounded-full hover:bg-muted"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {monthNames[currentMonth]} {currentYear}
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
            
            {/* Calendar Legend */}
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
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Week day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-sm py-2"
                >
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {calendarData.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square border rounded-lg flex flex-col ${
                    day.isToday
                      ? "border-primary/50 bg-primary/5"
                      : "border-border"
                  } ${!day.day ? "bg-muted/30" : ""}`}
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
                        <div className="flex flex-wrap gap-1">
                          {day.habits
                            .filter(
                              (habit) =>
                                selectedHabit === "All" ||
                                habit.name === selectedHabit
                            )
                            .map((habit, hIndex) => (
                              <div
                                key={hIndex}
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    habit.status === 1
                                      ? "rgb(34, 197, 94)" // green for completed
                                      : "rgb(239, 68, 68)", // red for missed
                                }}
                                title={`${habit.name}: ${
                                  habit.status === 1 ? "Completed" : "Missed"
                                }`}
                              ></div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
