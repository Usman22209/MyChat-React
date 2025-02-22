// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@routes/ProtectedRoutes";
import AuthLayout from "./AuthLayout";
import PublicRoutes from "@routes/PublicRoutes";
import MainRoutes from "@routes/MainRoutes";
import NotFoundPage from "@pages/public/not-found";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (always accessible) */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Auth routes (only accessible when not logged in) */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>

      {/* Protected routes (only accessible when logged in) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat/*" element={<MainRoutes />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;