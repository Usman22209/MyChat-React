import React, { useState } from "react";
import { Menu, X, MessageSquare, Shield, Globe, PhoneCall, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

interface NavButtonProps {
  icon: React.ElementType;
  text: string;
  onClick: () => void;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`relative w-10 md:w-12 h-5 md:h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
      checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
    }`}
  >
    <div
      className={`absolute top-0.5 md:top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
        checked ? "transform translate-x-5 md:translate-x-6" : "transform translate-x-0"
      }`}
    />
  </div>
);

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 ${className}`}
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-sm sm:text-base">{text}</span>
  </button>
);

const AuthNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const validRoutes = ["/", "/security", "/contact", "/about", "/login", "/signup"];

  const handleNavigation = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white py-[2px] sm:py-2 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-gray-900 dark:text-white font-bold text-lg md:text-xl">
              MyChat
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <NavButton
              icon={Shield}
              text="Security"
              onClick={() => handleNavigation("/security")}
            />
            <NavButton
              icon={PhoneCall}
              text="Contact"
              onClick={() => handleNavigation("/contact")}
            />
            <NavButton icon={Globe} text="About" onClick={() => handleNavigation("/about")} />

            {/* Theme Toggle */}
            <div className="px-3 py-1 flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 ml-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <ToggleSwitch checked={theme === "dark"} onChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            {/* Auth Buttons */}
            <button
              onClick={() => handleNavigation("/auth/login")}
              className="px-4 py-2 text-sm md:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              Log in
            </button>
            <button
              onClick={() => handleNavigation("/auth/signup")}
              className="px-4 py-2 text-sm md:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle for Mobile */}
            <div className="flex items-center space-x-1">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <ToggleSwitch checked={theme === "dark"} onChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200"
            >
              {isOpen ? (
                <X className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3"
            >
              <div className="flex flex-col space-y-2">
                <NavButton
                  icon={Shield}
                  text="Security"
                  onClick={() => handleNavigation("/security")}
                  className="text-xs sm:text-sm md:text-base"
                />
                <NavButton
                  icon={PhoneCall}
                  text="Contact"
                  onClick={() => handleNavigation("/contact")}
                  className="text-xs sm:text-sm md:text-base"
                />
                <NavButton
                  icon={Globe}
                  text="About"
                  onClick={() => handleNavigation("/about")}
                  className="text-xs sm:text-sm md:text-base"
                />

                {/* Auth Buttons */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className="w-full px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/signup")}
                    className="w-full px-4 py-2 mt-2 text-xs sm:text-sm md:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-200"
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
