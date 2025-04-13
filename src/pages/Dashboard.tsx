
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HabitCard from "../components/HabitCard";
import ProgressBar from "../components/ProgressBar";
import { Search, Filter, Bell, User, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Define habit interface
interface Habit {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  streak: number;
  completed: boolean;
  createdAt: string;
  userId: string;
}

// Mock categories
const categories = [
  { name: 'All', color: '#6B7280' },
  { name: 'Fitness', color: '#EC4899' },
  { name: 'Wellness', color: '#8B5CF6' },
  { name: 'Learning', color: '#3B82F6' },
  { name: 'Health', color: '#10B981' },
  { name: 'Hobby', color: '#F59E0B' },
];

const Dashboard = () => {
  const { user, addNotification } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Wellness',
  });
  
  // Load habits from localStorage
  useEffect(() => {
    if (user) {
      const savedHabits = localStorage.getItem(`habitflow_habits_${user.id}`);
      if (savedHabits) {
        try {
          setHabits(JSON.parse(savedHabits));
        } catch (error) {
          console.error("Failed to parse saved habits:", error);
        }
      } else {
        // Add sample habits for new users
        const initialHabits = [
          { id: '1', name: 'Morning Meditation', category: 'Wellness', categoryColor: '#8B5CF6', streak: 0, completed: false, createdAt: new Date().toISOString(), userId: user.id },
          { id: '2', name: '10,000 Steps', category: 'Fitness', categoryColor: '#EC4899', streak: 0, completed: false, createdAt: new Date().toISOString(), userId: user.id },
          { id: '3', name: 'Read 30 minutes', category: 'Learning', categoryColor: '#3B82F6', streak: 0, completed: false, createdAt: new Date().toISOString(), userId: user.id },
        ];
        setHabits(initialHabits);
        localStorage.setItem(`habitflow_habits_${user.id}`, JSON.stringify(initialHabits));
        
        // Send welcome notification
        addNotification({
          message: "We've added some sample habits to get you started!",
          type: "info"
        });
      }
    }
  }, [user, addNotification]);
  
  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (user && habits.length > 0) {
      localStorage.setItem(`habitflow_habits_${user.id}`, JSON.stringify(habits));
    }
  }, [habits, user]);
  
  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  
  const toggleComplete = (id: string) => {
    const habitToToggle = habits.find(h => h.id === id);
    
    if (!habitToToggle) return;
    
    const wasCompleted = habitToToggle.completed;
    
    const updatedHabits = habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completed: !habit.completed,
            // Increment streak only if marking complete and wasn't already completed
            streak: !wasCompleted && !habit.completed 
              ? habit.streak + 1 
              : (wasCompleted && habit.completed ? Math.max(0, habit.streak - 1) : habit.streak)
          } 
        : habit
    );
    
    setHabits(updatedHabits);
    
    const habitName = habits.find(h => h.id === id)?.name;
    const isCompleted = !wasCompleted;
    
    if (isCompleted) {
      toast.success(`"${habitName}" marked as complete!`);
      
      // Add streak milestone notifications
      const newStreak = habitToToggle.streak + 1;
      if (newStreak === 3) {
        addNotification({
          message: `3-day streak on "${habitName}"! Keep it up!`,
          type: "success"
        });
      } else if (newStreak === 7) {
        addNotification({
          message: `Impressive! 7-day streak on "${habitName}"!`,
          type: "success"
        });
      } else if (newStreak === 30) {
        addNotification({
          message: `Amazing! 30-day streak on "${habitName}"! You're building a real habit now!`,
          type: "success"
        });
      } else if (newStreak % 10 === 0 && newStreak > 0) {
        addNotification({
          message: `${newStreak}-day streak on "${habitName}"! Fantastic progress!`,
          type: "success"
        });
      }
    }
  };
  
  const editHabit = (id: string, updatedData: Partial<Habit>) => {
    const updatedHabits = habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            ...updatedData,
            // Update category color if category changed
            categoryColor: updatedData.category 
              ? categories.find(c => c.name === updatedData.category)?.color || habit.categoryColor
              : habit.categoryColor
          } 
        : habit
    );
    
    setHabits(updatedHabits);
    toast.success(`"${updatedData.name || habits.find(h => h.id === id)?.name}" updated`);
  };
  
  const deleteHabit = (id: string) => {
    const habitName = habits.find(h => h.id === id)?.name;
    setHabits(habits.filter(habit => habit.id !== id));
    toast.error(`"${habitName}" deleted`);
    
    // Add notification about deletion
    addNotification({
      message: `You've deleted "${habitName}" from your habits`,
      type: "info"
    });
  };
  
  const addNewHabit = () => {
    if (!newHabit.name.trim()) {
      toast.error("Please enter a habit name");
      return;
    }
    
    const categoryColor = categories.find(c => c.name === newHabit.category)?.color || '#8B5CF6';
    
    const habit: Habit = {
      id: `habit-${Date.now()}`,
      name: newHabit.name,
      category: newHabit.category,
      categoryColor,
      streak: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user?.id || 'unknown'
    };
    
    setHabits([...habits, habit]);
    
    // Add notification
    addNotification({
      message: `New habit "${newHabit.name}" created. Start building consistency!`,
      type: "success"
    });
    
    toast.success(`"${newHabit.name}" created`);
    setNewHabit({ name: '', category: 'Wellness' });
    setIsAddHabitOpen(false);
  };
  
  // Filter habits based on category and search query
  const filteredHabits = habits.filter(habit => 
    (selectedCategory === 'All' || habit.category === selectedCategory) &&
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate the longest streak
  const longestStreak = habits.length > 0 
    ? Math.max(...habits.map(h => h.streak))
    : 0;
  
  // Calculate perfect days this week (simplified)
  const perfectDays = habits.length > 0 
    ? Math.min(7, Math.floor(Math.random() * 4) + 1) // Mock data - would be calculated from actual habit completion dates
    : 0;
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-muted">
              <Bell className="h-5 w-5" />
            </button>
            <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>
        
        <main className="p-6">
          {/* Progress Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Today's Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="mb-4">
                  <ProgressBar 
                    value={completedHabits} 
                    maxValue={totalHabits} 
                    label="Daily Progress" 
                    size="lg" 
                  />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{completedHabits}/{totalHabits}</p>
                  <p className="text-sm text-muted-foreground">habits completed</p>
                </div>
              </div>
              
              <div className="card">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {longestStreak}
                  </p>
                  <p className="text-sm text-muted-foreground">longest streak</p>
                </div>
              </div>
              
              <div className="card">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{perfectDays}</p>
                  <p className="text-sm text-muted-foreground">perfect days this week</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Habits List */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-lg font-semibold mb-2 md:mb-0">My Habits</h2>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search habits..."
                    className="pl-10 py-2 pr-4 bg-muted/50 rounded-md text-sm w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2 overflow-x-auto pb-1 md:pb-0">
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                        selectedCategory === category.name
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 text-foreground/80 hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></span>
                        {category.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHabits.map(habit => (
                <HabitCard 
                  key={habit.id} 
                  habit={habit} 
                  onToggleComplete={toggleComplete}
                  onEdit={(id) => {
                    const habit = habits.find(h => h.id === id);
                    if (habit) {
                      setNewHabit({ name: habit.name, category: habit.category });
                      toast.info(`Editing habit: ${habit.name}`);
                    }
                  }}
                  onDelete={deleteHabit}
                />
              ))}
              
              <button 
                onClick={() => setIsAddHabitOpen(true)}
                className="card flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 text-muted-foreground/80 hover:text-muted-foreground transition-colors"
              >
                <div className="text-center">
                  <Plus className="h-10 w-10 mx-auto mb-2" />
                  <p>Add New Habit</p>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add Habit Dialog */}
      <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
            <DialogDescription>
              Create a new habit to track. Make it specific and actionable.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="habit-name" className="text-right">
                Name
              </Label>
              <Input
                id="habit-name"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                placeholder="e.g. Morning Meditation"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="habit-category" className="text-right">
                Category
              </Label>
              <Select
                value={newHabit.category}
                onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddHabitOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewHabit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
