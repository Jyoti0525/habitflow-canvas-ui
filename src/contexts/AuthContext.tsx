
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const navigate = useNavigate();

  // Check if the user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("habitflow_user");
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("habitflow_user");
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Mock login function - would connect to an API in production
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app this would be server-side
      if (email === "demo@example.com" && password === "password") {
        const mockUser = {
          id: "user-123",
          name: "Demo User",
          email: "demo@example.com"
        };
        
        setUser(mockUser);
        localStorage.setItem("habitflow_user", JSON.stringify(mockUser));
        
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

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a server-side registration
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem("habitflow_user", JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
