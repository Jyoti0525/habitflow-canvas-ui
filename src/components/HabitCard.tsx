
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, MoreHorizontal, FileEdit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Habit {
  id: string;
  name: string;
  description?: string;
  category: string;
  categoryColor: string;
  streak: number;
  completed: boolean;
  createdAt: string;
}

interface HabitCardProps {
  habit: Habit;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, data: Partial<Habit>) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const createdDate = new Date(habit.createdAt).toLocaleDateString();

  return (
    <Card className="relative group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          {habit.name}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={habit.completed ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onToggleComplete(habit.id)}
          >
            <CheckCircle2 className={`h-4 w-4 ${habit.completed ? "text-white" : "text-gray-400"}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit.id, {})}>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(habit.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: habit.categoryColor }}
          />
          <span className="text-sm text-muted-foreground">{habit.category}</span>
        </div>
        {habit.description && (
          <CardDescription className="mt-2">
            {habit.description}
          </CardDescription>
        )}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <span>Created: {createdDate}</span>
          <span>🔥 {habit.streak} day streak</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
