// src/routes/ProtectedRoute.tsx
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
