import React from "react";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import AuthNavbar from "@components/auth-navbar";
import MainNavbar from "@components/main-navbar";
import { useUser } from "@clerk/clerk-react";

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
  const { theme } = useTheme();
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
    >
      {/* Show Navbars Only When Clerk is Loaded */}
      {isLoaded ? (isSignedIn ? <MainNavbar /> : <AuthNavbar />) : null}

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
