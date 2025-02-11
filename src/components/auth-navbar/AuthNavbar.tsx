import React, { useState } from "react";
import { Menu, X, MessageSquare, Shield, Globe, PhoneCall, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

const AuthNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const validRoutes = ["/landing", "/security", "/contact", "/about", "/login", "/signup"];

  const handleNavigation = (url: string) => {
    if (validRoutes.includes(url)) {
      navigate(url);
      setIsOpen(false);
    } else {
      console.error(`Invalid route: ${url}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNavigation("/landing")} className="flex items-center">
            <MessageSquare className="h-8 w-8 text-white" />
            <span className="ml-2 text-white font-bold text-xl">MyChat</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <button
              onClick={() => handleNavigation("/security")}
              className="text-white/90 hover:text-white flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="text-white/90 hover:text-white flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <PhoneCall className="h-5 w-5" />
              <span>Contact</span>
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="text-white/90 hover:text-white flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>About</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => handleNavigation("/login")}
              className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => handleNavigation("/signup")}
              className="bg-white text-indigo-600 hover:bg-white/90 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-2">
                <button
                  onClick={() => handleNavigation("/security")}
                  className="w-full flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                >
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="w-full flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                >
                  <PhoneCall className="h-5 w-5" />
                  <span>Contact</span>
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="w-full flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  <span>About</span>
                </button>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleNavigation("/signin")}
                    className="w-full text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="w-full bg-white text-indigo-600 hover:bg-white/90 px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default AuthNavbar;
