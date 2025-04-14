
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Plus, ThumbsUp, ThumbsDown, Info } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface SuggestionItem {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  description: string;
  benefits: string[];
}

const Suggestions = () => {
  const { user, addNotification } = useAuth();
  // Mock suggestions data
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([
    {
      id: "1",
      name: "Meditation",
      category: "Wellness",
      categoryColor: "#8B5CF6",
      description: "Take 10 minutes each morning to clear your mind and focus.",
      benefits: ["Reduces stress", "Improves focus", "Enhances self-awareness"],
    },
    {
      id: "2",
      name: "Drink Water",
      category: "Health",
      categoryColor: "#10B981",
      description: "Drink at least 2 liters of water throughout the day.",
      benefits: ["Improves digestion", "Prevents dehydration", "Boosts energy levels"],
    },
    {
      id: "3",
      name: "Read a Book",
      category: "Learning",
      categoryColor: "#3B82F6",
      description: "Read at least 20 pages of a book before bed.",
      benefits: ["Expands vocabulary", "Reduces stress", "Improves sleep quality"],
    },
    {
      id: "4",
      name: "Daily Walk",
      category: "Fitness",
      categoryColor: "#EC4899",
      description: "Take a 30-minute walk outdoors to get fresh air and exercise.",
      benefits: ["Improves cardiovascular health", "Boosts mood", "Helps manage weight"],
    },
    {
      id: "5",
      name: "Gratitude Journal",
      category: "Wellness",
      categoryColor: "#8B5CF6",
      description: "Write down three things you're grateful for each day.",
      benefits: ["Improves mental health", "Increases positivity", "Enhances relationships"],
    },
    {
      id: "6",
      name: "Stretch Routine",
      category: "Fitness",
      categoryColor: "#EC4899",
      description: "Do a 10-minute stretching routine after waking up.",
      benefits: ["Increases flexibility", "Reduces muscle tension", "Improves posture"],
    },
  ]);
  
  const addToMyHabits = (suggestion: SuggestionItem) => {
    // Get existing habits from localStorage
    const existingHabits = localStorage.getItem(`habitflow_habits_${user?.id}`) || "[]";
    let habits = JSON.parse(existingHabits);
    
    // Create new habit from suggestion
    const newHabit = {
      id: `habit-${Date.now()}`,
      name: suggestion.name,
      category: suggestion.category,
      categoryColor: suggestion.categoryColor,
      streak: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user?.id || 'unknown',
      description: suggestion.description
    };
    
    // Add to habits list
    habits.push(newHabit);
    
    // Save to localStorage
    localStorage.setItem(`habitflow_habits_${user?.id}`, JSON.stringify(habits));
    
    // Show success toast
    toast.success(`Added "${suggestion.name}" to your habits!`);
    
    // Add notification
    addNotification({
      message: `New habit "${suggestion.name}" added to your list!`,
      type: "success"
    });
    
    // Remove from suggestions
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };
  
  const dismissSuggestion = (id: string) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
    toast.info("Suggestion removed");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-20 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Habit Suggestions</h1>
        </header>
        
        <main className="p-6">
          <div className="mb-8 bg-muted/50 p-4 rounded-lg flex items-center">
            <Info className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
            <p className="text-sm">
              Based on your current habits and goals, our AI has suggested these habits that might help you achieve better results. 
              Add the ones you like to your habit list!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className="card hover:shadow-md group relative overflow-hidden"
              >
                <div 
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br opacity-30"
                  style={{ backgroundColor: suggestion.categoryColor }}
                />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{suggestion.name}</h3>
                      <div 
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1" 
                        style={{ 
                          backgroundColor: `${suggestion.categoryColor}20`,
                          color: suggestion.categoryColor 
                        }}
                      >
                        {suggestion.category}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => dismissSuggestion(suggestion.id)}
                        className="p-2 rounded-full hover:bg-muted"
                        title="Dismiss suggestion"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => addToMyHabits(suggestion)}
                        className="p-2 rounded-full hover:bg-muted"
                        title="Add to my habits"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {suggestion.description}
                  </p>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {suggestion.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <div className="h-2 w-2 mt-1.5 mr-2 rounded-full" style={{ backgroundColor: suggestion.categoryColor }}></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => addToMyHabits(suggestion)}
                      className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to My Habits
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Suggestions;
