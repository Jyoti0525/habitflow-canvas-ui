
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-bold text-xl text-foreground">HabitFlow</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/calendar" className="text-foreground/80 hover:text-foreground transition-colors">Calendar</Link>
            <Link to="/analytics" className="text-foreground/80 hover:text-foreground transition-colors">Analytics</Link>
            <Link to="/settings" className="text-foreground/80 hover:text-foreground transition-colors">Settings</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/profile" className="p-2 rounded-full hover:bg-muted transition-colors">
              <User size={20} />
            </Link>
            <Link to="/login" className="btn-secondary py-2 px-4">Login</Link>
            <Link to="/dashboard" className="btn-primary py-2 px-4">Get Started</Link>
          </div>
        </div>
        
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border z-50 animate-fade-in">
          <nav className="container mx-auto flex flex-col space-y-4 p-4">
            <Link to="/" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Home</Link>
            <Link to="/dashboard" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/calendar" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Calendar</Link>
            <Link to="/analytics" className="p-2 hover:bg-muted rounded-md flex items-center" onClick={toggleMenu}>
              <BarChart2 size={16} className="mr-2" />
              Analytics
            </Link>
            <Link to="/profile" className="p-2 hover:bg-muted rounded-md flex items-center" onClick={toggleMenu}>
              <User size={16} className="mr-2" />
              Profile
            </Link>
            <Link to="/settings" className="p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>Settings</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Link to="/login" className="btn-secondary w-full text-center" onClick={toggleMenu}>Login</Link>
              <Link to="/dashboard" className="btn-primary w-full text-center" onClick={toggleMenu}>Get Started</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
