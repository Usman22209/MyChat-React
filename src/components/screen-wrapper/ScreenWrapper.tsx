import React, { useEffect, useState } from "react";

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
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  // Apply theme on mount and when toggled
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <div
        className={`w-full mx-auto ${padding} ${getMaxWidthClass(maxWidth)} ${
          centered ? "flex flex-col items-center" : ""
        } ${className}`}
      >
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
        >
          Toggle Theme
        </button>
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;
