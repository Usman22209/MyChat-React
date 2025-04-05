import React, { useState } from "react";
import { MessageSquare, Shield, Globe, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@components/toggle-theme";
import Switch from "@components/hamburger/Hamburger";
import { logoDark, logoLight } from "@assets/img";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
interface NavButtonProps {
  icon: React.ElementType;
  text: string;
  onClick: () => void;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all duration-200 ${className}`}
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="text-sm sm:text-base">{text}</span>
  </button>
);

const AuthNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
const {theme}=useTheme();
  const handleNavigation = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white py-[2px] sm:py-2 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <img src={theme === "dark" ? logoDark : logoLight} alt="Logo" className="h-16 w-auto" />
            <span className="text-gray-900 dark:text-white font-bold text-lg md:text-xl">
              MyChat
            </span>
          </button>
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
            <ThemeToggle containerClassName="px-3 py-1 flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 ml-2" />
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
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle containerClassName="flex items-center space-x-1" />
            <div className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200">
              <Switch checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
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
                />
                <NavButton
                  icon={PhoneCall}
                  text="Contact"
                  onClick={() => handleNavigation("/contact")}
                />
                <NavButton icon={Globe} text="About" onClick={() => handleNavigation("/about")} />
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <button
                    onClick={() => handleNavigation("/auth/login")}
                    className="w-full px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handleNavigation("/auth/signup")}
                    className="w-full px-4 py-2 mt-2 text-xs sm:text-sm md:text-base bg-indigo-600 text-white rounded-lg"
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
