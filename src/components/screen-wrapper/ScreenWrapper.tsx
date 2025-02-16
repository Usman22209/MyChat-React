import React from "react";
import AuthNavbar from "@components/auth-navbar";
import MainNavbar from "@components/main-navbar";
import { useAuth } from "@providers/auth-provider/AuthProvider";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: string;
  centered?: boolean;
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
}) => {
 
  const { loading, isLoggedIn } = useAuth();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-all duration- z-10`}
    >
      {!loading ? isLoggedIn ? <MainNavbar /> : <AuthNavbar /> : null}

      <div
        className={`w-full mx-auto ${padding} ${getMaxWidthClass(maxWidth)} ${
          centered ? "flex flex-col items-center" : ""
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;
