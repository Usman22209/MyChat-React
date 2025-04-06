import React from "react";
import { useTheme } from "@providers/theme-provider/ThemeProvider";

interface GenderOption {
  id: string;
  label: string;
  icon: string;
  color: string;
  activeColor: string;
  textColor: string;
  borderColor: string;
}

interface GenderSelectorProps {
  value: string;
  onChange: (genderId: string) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const genderOptions: GenderOption[] = [
    {
      id: "male",
      label: "Male",
      icon: "♂",
      color: isDark ? "bg-blue-400/20" : "bg-blue-200",
      activeColor: isDark
        ? "bg-gradient-to-br from-blue-300 to-blue-500"
        : "bg-gradient-to-br from-blue-500 to-blue-700",
      textColor: isDark ? "text-blue-200" : "text-blue-800",
      borderColor: isDark ? "border-blue-300" : "border-blue-700",
    },
    {
      id: "female",
      label: "Female",
      icon: "♀",
      color: isDark ? "bg-rose-400/20" : "bg-rose-200",
      activeColor: isDark
        ? "bg-gradient-to-br from-rose-300 to-rose-500"
        : "bg-gradient-to-br from-rose-500 to-rose-700",
      textColor: isDark ? "text-rose-200" : "text-rose-800",
      borderColor: isDark ? "border-rose-300" : "border-rose-700",
    },
    {
      id: "nonbinary",
      label: "Non-binary",
      icon: "⚧",
      color: isDark ? "bg-violet-400/20" : "bg-violet-200",
      activeColor: isDark
        ? "bg-gradient-to-br from-violet-300 to-violet-500"
        : "bg-gradient-to-br from-violet-500 to-violet-700",
      textColor: isDark ? "text-violet-200" : "text-violet-800",
      borderColor: isDark ? "border-violet-300" : "border-violet-700",
    },
    {
      id: "notspecified",
      label: "Prefer not to say",
      icon: "?",
      color: isDark ? "bg-gray-400/20" : "bg-gray-200",
      activeColor: isDark
        ? "bg-gradient-to-br from-gray-300 to-gray-500"
        : "bg-gradient-to-br from-gray-500 to-gray-700",
      textColor: isDark ? "text-gray-200" : "text-gray-800",
      borderColor: isDark ? "border-gray-300" : "border-gray-700",
    },
  ];

  return (
    <div
      className={`p-6 rounded-xl shadow-xl max-w-2xl mx-auto transition-all duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      <h2
        className={`text-center font-bold text-xl mb-6 ${isDark ? "text-gray-100" : "text-gray-800"}`}
      >
        Choose Your Gender
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {genderOptions.map((gender) => (
          <button
            type="button" // Add this attribute to prevent form submission
            key={gender.id}
            onClick={() => onChange(gender.id)}
            className={`
              flex flex-col items-center justify-center
              transform transition-all duration-300 ease-out
              focus:outline-none hover:-translate-y-1
              active:scale-95 p-3 rounded-xl
              ${value === gender.id ? "scale-105" : ""}
              ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}
            `}
            aria-pressed={value === gender.id}
          >
            <div
              className={`
              w-16 h-16 rounded-full flex items-center justify-center
              transition-all duration-300 shadow-md
              ${value === gender.id ? gender.activeColor : gender.color}
              ${
                value === gender.id
                  ? `ring-2 ${gender.borderColor}`
                  : "border border-transparent hover:border-opacity-50 " +
                    (isDark ? "hover:border-white" : "hover:border-gray-400")
              }
            `}
            >
              <span
                className={`
                text-2xl transition-transform duration-300
                ${value === gender.id ? (isDark ? "text-white" : "text-white") : gender.textColor}
                ${value === gender.id ? "scale-125" : ""}
              `}
              >
                {gender.icon}
              </span>
            </div>

            <span
              className={`
              mt-3 text-sm font-medium transition-all duration-300
              ${
                value === gender.id
                  ? `font-bold ${gender.textColor}`
                  : isDark
                    ? "text-gray-300"
                    : "text-gray-600"
              }
            `}
            >
              {gender.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;
