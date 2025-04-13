
import { useState } from "react";
import { CheckCircle, MoreVertical, Edit, Trash } from "lucide-react";

interface HabitCardProps {
  habit: {
    id: string;
    name: string;
    category: string;
    categoryColor: string;
    streak: number;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard = ({ habit, onToggleComplete, onEdit, onDelete }: HabitCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => setShowMenu(!showMenu);
  
  return (
    <div className="card flex items-center justify-between group hover:shadow-md">
      <div className="flex items-center">
        <button 
          onClick={() => onToggleComplete(habit.id)} 
          className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center transition-colors ${
            habit.completed 
              ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <CheckCircle className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center">
            <h3 className={`font-medium ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>{habit.name}</h3>
            <div 
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium" 
              style={{ backgroundColor: `${habit.categoryColor}20`, color: habit.categoryColor }}
            >
              {habit.category}
            </div>
          </div>
          {habit.streak > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {habit.streak} day{habit.streak > 1 ? 's' : ''} streak 🔥
            </p>
          )}
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={toggleMenu}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-1 w-36 bg-background border border-border rounded-md shadow-md z-10">
            <button 
              onClick={() => { onEdit(habit.id); setShowMenu(false); }}
              className="w-full px-4 py-2 text-left flex items-center hover:bg-muted text-sm rounded-t-md"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </button>
            <button 
              onClick={() => { onDelete(habit.id); setShowMenu(false); }}
              className="w-full px-4 py-2 text-left flex items-center hover:bg-muted text-sm text-destructive rounded-b-md"
            >
              <Trash className="h-4 w-4 mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
