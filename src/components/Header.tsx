import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, User, BarChart2, LogOut, ChevronDown, Bell, Check, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
    isAuthenticated, 
    user, 
    logout, 
    notifications, 
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications
  } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
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

  const formatNotificationTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, just show the time
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a");
    }
    
    // If it's within the last 7 days, show the day name
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return format(date, "EEEE 'at' h:mm a");
    }
    
    // Otherwise show the full date
    return format(date, "MMM d 'at' h:mm a");
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
            
            {isAuthenticated && (
              <>
                {/* Notifications Bell */}
                <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <button 
                      className="relative p-2 rounded-full hover:bg-muted transition-colors" 
                      aria-label="Notifications"
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                        >
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end" ref={notificationsRef}>
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-medium">Notifications</h3>
                      <div className="flex gap-2">
                        {unreadCount > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-xs"
                            onClick={markAllNotificationsAsRead}
                          >
                            <Check size={14} className="mr-1" />
                            Mark all read
                          </Button>
                        )}
                        {notifications.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={clearNotifications}
                          >
                            <Trash2 size={14} className="mr-1" />
                            Clear all
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <ScrollArea className="h-[320px] mt-2">
                      {notifications.length > 0 ? (
                        <div className="flex flex-col gap-1 py-1">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`p-2 rounded-md ${notification.read ? 'bg-background' : 'bg-muted'}`}
                              onClick={() => notification.read ? null : markNotificationAsRead(notification.id)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={`text-sm font-medium ${!notification.read && 'text-primary'}`}>
                                  {notification.type === 'success' && '🎉 '}
                                  {notification.type === 'warning' && '⚠️ '}
                                  {notification.type === 'info' && 'ℹ️ '}
                                  {notification.message}
                                </span>
                                {!notification.read && (
                                  <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                                )}
                              </div>
                              <span className="text-[11px] text-muted-foreground">
                                {formatNotificationTime(notification.timestamp)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No notifications yet</p>
                          <p className="text-sm">We'll notify you when something happens</p>
                        </div>
                      )}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
                
                {/* User Profile */}
                <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <PopoverTrigger asChild>
                    <button 
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-colors" 
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8 bg-primary text-primary-foreground hover:cursor-pointer">
                        {user?.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback>{getInitial()}</AvatarFallback>
                        )}
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
              </>
            )}
            
            {!isAuthenticated && (
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
            <>
              {/* Mobile Notifications Bell */}
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                className="relative p-1 rounded-full hover:bg-muted"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </button>
              
              {/* Mobile User Avatar */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="p-1 rounded-full hover:bg-muted"
              >
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback>{getInitial()}</AvatarFallback>
                  )}
                </Avatar>
              </button>
            </>
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
      
      {/* Mobile Notifications Dropdown */}
      {isNotificationsOpen && isAuthenticated && !isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full max-w-sm bg-background border border-border rounded-md shadow-lg z-50 m-2 animate-fade-in">
          <div className="p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-medium">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-xs"
                    onClick={markAllNotificationsAsRead}
                  >
                    <Check size={14} className="mr-1" />
                    Mark all read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                    onClick={clearNotifications}
                  >
                    <Trash2 size={14} className="mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
            </div>
            
            <ScrollArea className="h-[60vh]">
              {notifications.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-2 rounded-md ${notification.read ? 'bg-background' : 'bg-muted'}`}
                      onClick={() => notification.read ? null : markNotificationAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-medium ${!notification.read && 'text-primary'}`}>
                          {notification.type === 'success' && '🎉 '}
                          {notification.type === 'warning' && '⚠️ '}
                          {notification.type === 'info' && 'ℹ️ '}
                          {notification.message}
                        </span>
                        {!notification.read && (
                          <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {formatNotificationTime(notification.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No notifications yet</p>
                  <p className="text-sm">We'll notify you when something happens</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
