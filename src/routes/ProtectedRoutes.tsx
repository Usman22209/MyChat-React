import { useAuth } from "@providers/auth-provider/AuthProvider";
import { Navigate, Outlet } from 'react-router-dom'
import AuthRoutes from "@routes/AuthRoutes";
import MainRoutes from "@routes/MainRoutes";

const ProtectedRoute = () => {
    const { user } = useAuth(); 
  
    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    return <Outlet />; 
  };
  
  export default ProtectedRoute;