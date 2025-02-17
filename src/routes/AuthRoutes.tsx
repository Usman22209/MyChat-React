import { Route, Routes } from "react-router-dom";
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import ForgotPassword from '../pages/ForgotPassword';
import ContactPage from "@pages/auth/contact/Contact";
import AboutPage from "@pages/auth/about";
import LandingPage from "@pages/auth/landing";
import Login from "@pages/auth/login/Login";
import Signup from "@pages/auth/signup/Signup";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AuthRoutes;
