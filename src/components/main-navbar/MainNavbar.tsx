import React, { useState } from "react";
import { MessageSquare, Bell, Settings, Search, Home, User, LogOut, SunMoon } from "lucide-react";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "@components/hamburger/Hamburger";
import Logout from "@components/Logout";
import { logoLight, logoDark } from "@assets/img";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import ThemeToggle from "@components/toggle-theme";

const MainNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const sidebarBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const hoverBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const subtleText = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const iconColor = theme === "dark" ? "text-indigo-400" : "text-indigo-600";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Desktop View */}
          <div className="hidden md:flex flex-shrink-0 items-center space-x-2">
            <img src={theme === "dark" ? logoDark : logoLight} alt="Logo" className="h-16 w-auto" />
            <span className="text-gray-900 dark:text-white font-bold text-lg md:text-xl transition-colors duration-300">
              MyChat
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-colors duration-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
            </div>
            <button className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <Bell className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <div className="relative group">
              <button className="flex items-center justify-center overflow-hidden ring-2 ring-indigo-500 rounded-full h-8 w-8 md:h-9 md:w-9 hover:ring-indigo-600 transition-all duration-300">
                <img src={user.profilePic} alt="Profile" className="object-cover h-full w-full" />
              </button>
            </div>
            <Logout onLogout={logout} />
            <ThemeToggle containerClassName="px-3 py-1 flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 ml-2 transition-colors duration-300" />
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Left: Hamburger Menu */}
            <button className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <Switch checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
            </button>

            {/* Center: Logo and App Name */}
            <div className="flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
              <img
                src={theme === "dark" ? logoDark : logoLight}
                alt="Logo"
                className="h-8 w-auto"
              />
              <span className="text-gray-900 dark:text-white font-bold text-lg transition-colors duration-300">
                MyChat
              </span>
            </div>

            {/* Empty div to balance the layout */}
            <div className="w-10"></div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              <div
                className={`absolute inset-y-0 left-0 w-[80%] ${sidebarBg} flex flex-col h-full shadow-lg transition-colors duration-300`}
              >
                <div
                  className={`flex flex-col items-center p-6 border-b ${borderColor} transition-colors duration-300`}
                >
                  <div className="rounded-full overflow-hidden h-16 w-16 ring-2 ring-indigo-500 mb-2 transition-colors duration-300">
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <h2
                    className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-bold text-lg transition-colors duration-300`}
                  >
                    {user.name || "User"}
                  </h2>
                  <p className={`${subtleText} transition-colors duration-300`}>{user.email}</p>
                </div>

                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  <div className="px-4 space-y-1">
                    <button
                      className={`flex items-center w-full py-3 px-4 ${textColor} hover:${hoverBg} rounded-lg transition-all duration-300`}
                    >
                      <Home
                        className={`h-5 w-5 mr-3 ${iconColor} transition-colors duration-300`}
                      />
                      <span>Home</span>
                    </button>

                    <button
                      className={`flex items-center w-full py-3 px-4 ${textColor} hover:${hoverBg} rounded-lg transition-all duration-300`}
                    >
                      <Bell
                        className={`h-5 w-5 mr-3 ${iconColor} transition-colors duration-300`}
                      />
                      <span>Notifications</span>
                    </button>

                    <div
                      className={`flex items-center w-full py-3 px-4 ${textColor} hover:${hoverBg} rounded-lg transition-all duration-300`}
                    >
                      <SunMoon
                        className={`h-5 w-5 mr-3 ${iconColor} transition-colors duration-300`}
                      />
                      <span>Theme</span>
                      <div className="ml-auto">
                        <ThemeToggle containerClassName="p-0" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 border-t ${borderColor} transition-colors duration-300`}>
                  <button
                    onClick={logout}
                    className={`flex items-center w-full py-3 px-4 ${textColor} hover:${hoverBg} rounded-lg transition-all duration-300`}
                  >
                    <LogOut
                      className={`h-5 w-5 mr-3 ${iconColor} transition-colors duration-300`}
                    />
                    <span>Log Out</span>
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
