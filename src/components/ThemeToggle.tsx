
import { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeOption = "light" | "dark";
type ColorScheme = "blue" | "purple" | "green" | "amber" | "pink";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("blue");

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeOption | null;
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Set color scheme
    if (savedColorScheme) {
      setColorScheme(savedColorScheme);
      applyColorScheme(savedColorScheme);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const changeColorScheme = (newScheme: ColorScheme) => {
    setColorScheme(newScheme);
    localStorage.setItem("colorScheme", newScheme);
    applyColorScheme(newScheme);
  };

  const applyColorScheme = (scheme: ColorScheme) => {
    // Remove all existing color scheme classes
    document.documentElement.classList.remove(
      "theme-blue", 
      "theme-purple", 
      "theme-green", 
      "theme-amber", 
      "theme-pink"
    );
    
    // Add the new color scheme class
    document.documentElement.classList.add(`theme-${scheme}`);
    
    // Define color values for each theme
    const themeColors = {
      blue: { primary: "205 87% 61%", secondary: "160 84% 39%" },
      purple: { primary: "262 83% 76%", secondary: "240 60% 60%" },
      green: { primary: "142 76% 36%", secondary: "160 84% 39%" },
      amber: { primary: "38 92% 50%", secondary: "25 95% 53%" },
      pink: { primary: "336 80% 58%", secondary: "324 77% 48%" },
    };
    
    // Apply the color scheme
    document.documentElement.style.setProperty('--primary', themeColors[scheme].primary);
    document.documentElement.style.setProperty('--secondary', themeColors[scheme].secondary);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Toggle theme"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => changeColorScheme("blue")}>
          Blue <span className="h-4 w-4 rounded-full bg-blue-500 ml-2"></span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => changeColorScheme("purple")}>
          Purple <span className="h-4 w-4 rounded-full bg-purple-500 ml-2"></span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => changeColorScheme("green")}>
          Green <span className="h-4 w-4 rounded-full bg-green-500 ml-2"></span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => changeColorScheme("amber")}>
          Amber <span className="h-4 w-4 rounded-full bg-amber-500 ml-2"></span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => changeColorScheme("pink")}>
          Pink <span className="h-4 w-4 rounded-full bg-pink-500 ml-2"></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
