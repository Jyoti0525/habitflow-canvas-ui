
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "apple";
}

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  timestamp: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  notifications: Notification[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  socialLogin: (provider: "google" | "apple") => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  // Check if the user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("habitflow_user");
      const storedNotifications = localStorage.getItem("habitflow_notifications");
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("habitflow_user");
        }
      }
      
      if (storedNotifications) {
        try {
          const parsedNotifications = JSON.parse(storedNotifications);
          setNotifications(parsedNotifications);
        } catch (error) {
          console.error("Failed to parse stored notifications:", error);
          localStorage.removeItem("habitflow_notifications");
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("habitflow_notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Check if user exists in localStorage
      const usersJson = localStorage.getItem("habitflow_users") || "[]";
      const users = JSON.parse(usersJson);
      
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Don't store password in the active user session
        const { password, ...userWithoutPassword } = foundUser;
        
        setUser({
          ...userWithoutPassword,
          provider: "email"
        });
        
        localStorage.setItem("habitflow_user", JSON.stringify({
          ...userWithoutPassword,
          provider: "email"
        }));
        
        // Add welcome back notification
        addNotification({
          message: "Welcome back! Ready to build some habits?",
          type: "info"
        });
        
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Get existing users or initialize empty array
      const usersJson = localStorage.getItem("habitflow_users") || "[]";
      const users = JSON.parse(usersJson);
      
      // Check if email already exists
      if (users.some((user: any) => user.email === email)) {
        toast.error("Email already registered");
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In a real app, password would be hashed on the server
        createdAt: new Date().toISOString(),
      };
      
      // Add to users array
      users.push(newUser);
      localStorage.setItem("habitflow_users", JSON.stringify(users));
      
      // Login the user (without storing password in session)
      const { password: _, ...userWithoutPassword } = newUser;
      const userWithProvider = {
        ...userWithoutPassword,
        provider: "email" as const
      };
      
      setUser(userWithProvider);
      localStorage.setItem("habitflow_user", JSON.stringify(userWithProvider));
      
      // Add welcome notification
      addNotification({
        message: "Welcome to HabitFlow! Add your first habit to get started.",
        type: "success"
      });
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: "google" | "apple") => {
    setIsLoading(true);
    
    try {
      // Simulate social authentication
      // In a real implementation, this would be an OAuth flow
      
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: `${provider}-user-${Date.now()}`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `${provider}user@example.com`,
        provider,
        avatar: `https://ui-avatars.com/api/?name=${provider}+user&background=random`,
      };
      
      // Get existing users or initialize empty array
      const usersJson = localStorage.getItem("habitflow_users") || "[]";
      const users = JSON.parse(usersJson);
      
      // Check if this social user already exists
      const existingUser = users.find((u: any) => u.email === mockUser.email);
      
      if (!existingUser) {
        // Add to users array without password (social login)
        users.push(mockUser);
        localStorage.setItem("habitflow_users", JSON.stringify(users));
      }
      
      // Set the current user
      setUser(mockUser);
      localStorage.setItem("habitflow_user", JSON.stringify(mockUser));
      
      // Add welcome notification
      addNotification({
        message: `Welcome! You've signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`,
        type: "success"
      });
      
      toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed. Please try again.`);
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("habitflow_user");
    toast.success("You have been logged out.");
    navigate("/login");
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("habitflow_user", JSON.stringify(updatedUser));
      
      // Also update in the users array
      const usersJson = localStorage.getItem("habitflow_users") || "[]";
      const users = JSON.parse(usersJson);
      
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      
      localStorage.setItem("habitflow_users", JSON.stringify(updatedUsers));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  // Notification management
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: Date.now(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 20)); // Keep only the 20 most recent notifications
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("habitflow_notifications");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      notifications,
      login, 
      register, 
      socialLogin,
      logout,
      updateProfile,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearNotifications
    }}>
      {children}
    </AuthContext.Provider>
  );
};
