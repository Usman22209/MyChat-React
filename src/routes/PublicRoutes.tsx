// src/routes/PublicRoutes.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/auth/landing";
import AboutPage from "@pages/auth/about";
import ContactPage from "@pages/auth/contact";
import NotFoundPage from "@pages/public/not-found";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;