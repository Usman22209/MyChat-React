import { Routes, Route } from "react-router-dom";
import AuthRoutes from "@routes/AuthRoutes";
import MainRoutes from "@routes/MainRoutes";
import ProtectedRoute from "@routes/ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<MainRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
