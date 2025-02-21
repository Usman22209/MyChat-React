import React, { useState, useEffect } from "react";
import AuthNavbar from "@components/auth-navbar";
import MainNavbar from "@components/main-navbar";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import Footer from "@components/footer";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: string;
  centered?: boolean;
  onMount?: () => void;
}

const getMaxWidthClass = (maxWidth: ScreenWrapperProps["maxWidth"]) => {
  const widthMap = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };
  return widthMap[maxWidth || "lg"];
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className = "",
  maxWidth = "lg",
  padding = "p-4 md:p-6",
  centered = true,
  onMount,
}) => {
  const { loading: authLoading, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        onMount?.();
      }, 0);
    }
  }, [loading, authLoading, onMount]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-all duration- z-10 text-gray-900 dark:text-gray-100`}
    >
      {/* Always show the navbar */}
      {!authLoading ? isLoggedIn ? <MainNavbar /> : <AuthNavbar /> : null}

      {/* Loader shown below navbar */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 dark:border-indigo-400"></div>
        </div>
      ) : (
        <>
          <div
            className={`w-full mx-auto ${padding} ${getMaxWidthClass(
              maxWidth
            )} ${centered ? "flex flex-col items-center" : ""} ${className}`}
          >
            {children}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ScreenWrapper;
