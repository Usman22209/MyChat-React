import React, { useState } from "react";
import { MessageSquare, Bell, Settings, Search } from "lucide-react";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "@components/hamburger/Hamburger";
import Logout from "@components/Logout";
import { logoLight, logoDark } from "@assets/img";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import ThemeToggle from "@components/toggle-theme";

const MainNavbar: React.FC = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img src={theme === "dark" ? logoDark : logoLight} alt="Logo" className="h-16 w-auto" />
            <span className="text-gray-900 dark:text-white font-bold text-lg md:text-xl">
              ChatHub
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <button className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <Logout onLogout={logout} />
            <ThemeToggle containerClassName="px-3 py-1 flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 ml-2" />
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
              className="md:hidden py-4 mt-2"
            >
              <div className="flex flex-col space-y-4">
                <div className="relative px-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="grid grid-cols-1 gap-3 px-2">
                  <button className="flex items-center space-x-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Notifications</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>
                <div className="px-2 mt-2">
                  <button
                    onClick={logout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 512 512">
                      <path
                        fill="currentColor"
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                      />
                    </svg>
                    <span className="font-medium">Logout</span>
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

export default MainNavbar;
