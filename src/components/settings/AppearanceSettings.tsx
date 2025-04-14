
import { Sun } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { toast } from "sonner";

export const AppearanceSettings = () => {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Sun className="h-5 w-5 mr-2" />
        Appearance
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div>
            <h3 className="font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Toggle between light and dark mode
            </p>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="py-2">
          <h3 className="font-medium mb-2">Color Scheme</h3>
          <div className="grid grid-cols-5 gap-2">
            {[
              { name: "Blue", color: "#3B82F6" },
              { name: "Purple", color: "#8B5CF6" },
              { name: "Pink", color: "#EC4899" },
              { name: "Green", color: "#10B981" },
              { name: "Amber", color: "#F59E0B" },
            ].map((scheme) => (
              <button
                key={scheme.name}
                className="h-10 rounded-md border-2 border-transparent hover:border-primary focus:border-primary focus:outline-none transition-colors"
                style={{ backgroundColor: scheme.color }}
                title={scheme.name}
                aria-label={`Select ${scheme.name} theme`}
                onClick={() => {
                  document.documentElement.style.setProperty(
                    '--primary', 
                    scheme.name.toLowerCase() === 'blue' ? "205 87% 61%" :
                    scheme.name.toLowerCase() === 'purple' ? "262 83% 76%" :
                    scheme.name.toLowerCase() === 'pink' ? "336 80% 58%" :
                    scheme.name.toLowerCase() === 'green' ? "142 76% 36%" :
                    "38 92% 50%" // amber
                  );
                  toast.success(`${scheme.name} theme applied`);
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
