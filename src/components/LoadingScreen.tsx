
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-3xl">H</span>
        </div>
        <h1 className="text-2xl font-bold text-primary">HabitFlow</h1>
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      </div>
    </div>
  );
};

export default LoadingScreen;
