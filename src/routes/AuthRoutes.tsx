import { Route, Routes } from "react-router-dom";
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import ForgotPassword from '../pages/ForgotPassword';
import LandingPage from "@pages/auth/landing";
import Login from "@pages/auth/login/Login";
import Signup from "@pages/auth/signup/Signup";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default AuthRoutes;
