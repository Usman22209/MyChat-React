import React, { useState } from "react";
import { MessageSquare, Bell, Settings, Search } from "lucide-react";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "@components/hamburger/Hamburger";

const MainNavbar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-gray-900 dark:text-white font-bold text-lg md:text-xl">
              ChatHub
            </span>
          </div>

          {/* Desktop Navigation */}
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

            <button
              onClick={logout}
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200"
            >
              <Settings className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* User Avatar - Uncomment when ready */}
            {/* <div className="flex items-center ml-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-indigo-500 rounded-full",
                  },
                }}
              />
            </div> */}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* User Avatar - Uncomment when ready */}
            {/* <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-indigo-500 rounded-full",
                  },
                }}
              />
            </div> */}

            {/* Custom Switch Menu Button */}
            <div className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-all duration-200">
              <Switch checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
            </div>
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
              className="md:hidden border-t border-gray-200 dark:border-gray-800 py-3"
            >
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>

                <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>

                <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default MainNavbar;
