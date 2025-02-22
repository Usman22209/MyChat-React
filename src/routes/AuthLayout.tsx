// src/layouts/AuthLayout.tsx
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user?.emailVerified) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
