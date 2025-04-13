
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User, BarChart2, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
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
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">Dashboard</Link>
                <Link to="/calendar" className="text-foreground/80 hover:text-foreground transition-colors">Calendar</Link>
                <Link to="/analytics" className="text-foreground/80 hover:text-foreground transition-colors">Analytics</Link>
                <Link to="/settings" className="text-foreground/80 hover:text-foreground transition-colors">Settings</Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <PopoverTrigger asChild>
                  <button 
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors" 
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground hover:cursor-pointer">
                      <AvatarFallback>{getInitial()}</AvatarFallback>
                    </Avatar>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56" ref={popoverRef}>
                  <div className="space-y-2">
                    <div className="border-b pb-2">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="space-y-1">
                      <Link 
                        to="/profile" 
                        className="flex items-center px-2 py-2 rounded-md hover:bg-muted w-full text-left"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        <span>My Profile</span>
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center px-2 py-2 rounded-md hover:bg-muted w-full text-left text-destructive"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link to="/login" className="btn-secondary py-2 px-4">Login</Link>
                <Link to="/login" className="btn-primary py-2 px-4" onClick={() => document.cookie = "show_register=true"}>Get Started</Link>
              </>
            )}
          </div>
        </div>
        
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated && (
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="p-1 rounded-full hover:bg-muted"
            >
              <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                <AvatarFallback>{getInitial()}</AvatarFallback>
              </Avatar>
            </button>
          )}
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
            {isAuthenticated ? (
              <>
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
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }} 
                  className="p-2 hover:bg-muted rounded-md flex items-center text-destructive"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link to="/login" className="btn-secondary w-full text-center" onClick={toggleMenu}>Login</Link>
                <Link 
                  to="/login" 
                  className="btn-primary w-full text-center" 
                  onClick={() => {
                    document.cookie = "show_register=true";
                    toggleMenu();
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
          
          {isProfileOpen && isAuthenticated && (
            <div className="border-t p-4">
              <div className="space-y-2">
                <div className="border-b pb-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Mobile Profile Dropdown */}
      {isProfileOpen && isAuthenticated && !isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-64 bg-background border border-border rounded-md shadow-lg z-50 m-2 animate-fade-in">
          <div className="p-4 space-y-2">
            <div className="border-b pb-2">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <Link 
                to="/profile" 
                className="flex items-center px-2 py-2 rounded-md hover:bg-muted w-full text-left"
                onClick={() => setIsProfileOpen(false)}
              >
                <User size={16} className="mr-2" />
                <span>My Profile</span>
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }} 
                className="flex items-center px-2 py-2 rounded-md hover:bg-muted w-full text-left text-destructive"
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
