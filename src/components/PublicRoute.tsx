
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
