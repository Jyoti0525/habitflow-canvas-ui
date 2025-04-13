
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, Check, Clock, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface CategoryOption {
  name: string;
  color: string;
}

const AddHabit = () => {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState<CategoryOption | null>(null);
  const [frequency, setFrequency] = useState<string[]>([]);
  const [reminderTime, setReminderTime] = useState("");
  const [notes, setNotes] = useState("");
  
  const categories: CategoryOption[] = [
    { name: "Fitness", color: "#EC4899" },
    { name: "Wellness", color: "#8B5CF6" },
    { name: "Learning", color: "#3B82F6" },
    { name: "Health", color: "#10B981" },
    { name: "Hobby", color: "#F59E0B" },
    { name: "Work", color: "#6366F1" },
  ];
  
  const weekdays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  
  const toggleDay = (day: string) => {
    if (frequency.includes(day)) {
      setFrequency(frequency.filter(d => d !== day));
    } else {
      setFrequency([...frequency, day]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!habitName.trim()) {
      toast.error("Please enter a habit name");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    if (frequency.length === 0) {
      toast.error("Please select at least one day for your habit");
      return;
    }
    
    // In a real app, this would save the habit to a database
    toast.success(`New habit "${habitName}" created!`);
    
    // Reset form
    setHabitName("");
    setCategory(null);
    setFrequency([]);
    setReminderTime("");
    setNotes("");
  };
  
  const selectAllDays = () => {
    setFrequency([...weekdays]);
  };
  
  const clearAllDays = () => {
    setFrequency([]);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 p-2 rounded-full hover:bg-muted">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Create New Habit</h1>
          </div>
        </header>
        
        <main className="p-6">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="card glass mb-6">
              <div className="mb-6">
                <label htmlFor="habit-name" className="block text-sm font-medium mb-2">
                  Habit Name
                </label>
                <input
                  id="habit-name"
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g., Morning Meditation"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-full px-4 py-2 text-sm font-medium flex items-center justify-center ${
                        category?.name === cat.name
                          ? "bg-opacity-100 text-white"
                          : "bg-opacity-20 hover:bg-opacity-30"
                      } transition-colors`}
                      style={{
                        backgroundColor: category?.name === cat.name ? cat.color : `${cat.color}30`,
                        color: category?.name === cat.name ? "white" : cat.color,
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Frequency
                  <span className="text-xs ml-1 text-muted-foreground">(Select days)</span>
                </label>
                <div className="flex justify-between mb-2">
                  <button
                    type="button"
                    onClick={selectAllDays}
                    className="text-xs text-primary hover:underline"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearAllDays}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {weekdays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-full w-9 h-9 flex items-center justify-center text-xs font-medium transition-colors ${
                        frequency.includes(day)
                          ? "bg-primary text-white"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {day.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="reminder-time" className="block text-sm font-medium mb-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Reminder Time
                  </div>
                </label>
                <input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add some notes about this habit..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                ></textarea>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
              <Link 
                to="/dashboard" 
                className="btn-secondary text-center"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                className="btn-primary flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Create Habit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddHabit;
