import React, { useState } from "react";
import { Menu, X, MessageSquare, Bell, Settings, Search } from "lucide-react";
import { useAuth } from "@providers/auth-provider/AuthProvider";
// import { UserButton } from "@clerk/clerk-react";
("@services/auth.services");

const MainNavbar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <MessageSquare className="h-8 w-8 text-white" />
            <span className="ml-2 text-white font-bold text-xl">ChatHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/10 text-white placeholder-white/70 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>

            <button className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <Bell className="h-6 w-6" />
            </button>

            <button
              onClick={logout}
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>

            <div className="flex items-center ml-4">
              {/* <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12 border-2 border-white rounded-full",
                  },
                }}
              /> */}
            </div>
          </div>

          {/* Mobile header right section */}
          <div className="md:hidden flex items-center space-x-3">
            {/* <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 border-2 border-white rounded-full",
                },
              }}
            /> */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 text-white placeholder-white/70 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
                <Bell className="h-6 w-6" />
                <span>Notifications</span>
              </button>

              <button className="w-full flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
