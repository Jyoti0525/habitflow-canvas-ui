
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Auth Components
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LoadingScreen from "./components/LoadingScreen";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import AddHabit from "./pages/AddHabit";
import Suggestions from "./pages/Suggestions";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    
    {/* Auth routes (redirect to dashboard if logged in) */}
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
    </Route>
    
    {/* Protected routes (require authentication) */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/add-habit" element={<AddHabit />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/analytics" element={<Analytics />} />
    </Route>
    
    {/* 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
