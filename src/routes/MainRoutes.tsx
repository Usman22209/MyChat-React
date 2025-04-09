// src/routes/MainRoutes.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "@pages/auth/landing";
import ChatScreen from "@pages/chat/Chat/chat";
// import ChatPage from "@pages/public/chat/Chat";
// import DashboardPage from "@pages/public/dashboard/Dashboard";
// import ProfilePage from "@pages/public/profile/Profile";
// import SettingsPage from "@pages/public/settings/Settings";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatScreen />} />

      {/* <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;
