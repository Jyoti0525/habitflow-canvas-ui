
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import HabitCard from "../components/HabitCard";
import ProgressBar from "../components/ProgressBar";
import { Search, Filter, Bell, User, Plus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Mock data for habits
const initialHabits = [
  { id: '1', name: 'Morning Meditation', category: 'Wellness', categoryColor: '#8B5CF6', streak: 7, completed: false },
  { id: '2', name: '10,000 Steps', category: 'Fitness', categoryColor: '#EC4899', streak: 3, completed: false },
  { id: '3', name: 'Read 30 minutes', category: 'Learning', categoryColor: '#3B82F6', streak: 12, completed: true },
  { id: '4', name: 'Drink 2L of water', category: 'Health', categoryColor: '#10B981', streak: 5, completed: false },
  { id: '5', name: 'Practice guitar', category: 'Hobby', categoryColor: '#F59E0B', streak: 0, completed: false },
  { id: '6', name: 'Journal writing', category: 'Wellness', categoryColor: '#8B5CF6', streak: 21, completed: true },
];

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
  const [habits, setHabits] = useState(initialHabits);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  
  const toggleComplete = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed } 
        : habit
    ));
    
    const habitName = habits.find(h => h.id === id)?.name;
    const isCompleted = !habits.find(h => h.id === id)?.completed;
    
    if (isCompleted) {
      toast.success(`"${habitName}" marked as complete!`);
    }
  };
  
  const editHabit = (id: string) => {
    // In a real app, this would open a modal or navigate to edit page
    toast.info(`Editing habit: ${habits.find(h => h.id === id)?.name}`);
  };
  
  const deleteHabit = (id: string) => {
    // In a real app, this would show a confirmation dialog
    setHabits(habits.filter(habit => habit.id !== id));
    toast.error(`"${habits.find(h => h.id === id)?.name}" deleted`);
  };
  
  // Filter habits based on category and search query
  const filteredHabits = habits.filter(habit => 
    (selectedCategory === 'All' || habit.category === selectedCategory) &&
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
                    {Math.max(...habits.map(h => h.streak))}
                  </p>
                  <p className="text-sm text-muted-foreground">longest streak</p>
                </div>
              </div>
              
              <div className="card">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">3</p>
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
                  onEdit={editHabit}
                  onDelete={deleteHabit}
                />
              ))}
              
              <Link 
                to="/add-habit" 
                className="card flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50 text-muted-foreground/80 hover:text-muted-foreground transition-colors"
              >
                <div className="text-center">
                  <Plus className="h-10 w-10 mx-auto mb-2" />
                  <p>Add New Habit</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
