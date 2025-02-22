import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@pages/auth/login/Login";
import SignupPage from "@pages/auth/signup/Signup";
import ForgotPassword from "@pages/auth/forgot-password";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
