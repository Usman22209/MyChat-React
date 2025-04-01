import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

interface ThemeToggleProps {
  containerClassName?: string;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => (
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

const ThemeToggle: React.FC<ThemeToggleProps> = ({ containerClassName }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={containerClassName}>
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <ToggleSwitch checked={theme === "dark"} onChange={toggleTheme} />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default ThemeToggle;
