import React, { useState, useEffect, useMemo } from "react";
import AuthNavbar from "@components/auth-navbar";
import MainNavbar from "@components/main-navbar";
import { useAuth } from "@providers/auth-provider/AuthProvider";
import Footer from "@components/footer";
import Loader from "@components/loader";
import { Toaster } from "react-hot-toast";
import { getIsOpened } from "@redux/slices/app.slice";
import { useTheme } from "@providers/theme-provider/ThemeProvider";
import { useSelector } from "react-redux";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: string;
  centered?: boolean;
  footer?: boolean;
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

const ScreenWrapper: React.FC<ScreenWrapperProps> = React.memo(
  ({
    children,
    className = "",
    maxWidth = "lg",
    padding = "p-4 md:p-6",
    centered = true,
    footer = true,
    onMount,
  }) => {
    const { loading: authLoading, isLoggedIn, firebaseUser, token } = useAuth();
    const { theme } = useTheme();
    const isOpened = useSelector(getIsOpened);
    console.log(token);

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

    const maxWidthClass = useMemo(() => getMaxWidthClass(maxWidth), [maxWidth]);

    return (
      <div
        className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800
                transition-all duration-300 text-gray-900 dark:text-gray-100 ${
                  isOpened ? "md:ml-0 ml-[10vw]" : "ml-0"
                }`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {!authLoading && (isLoggedIn ? <MainNavbar /> : <AuthNavbar />)}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              className={`w-full flex-grow mx-auto ${padding} ${maxWidthClass} ${
                centered ? "flex flex-col items-center" : ""
              } ${className}`}
            >
              {children}
            </div>
            {footer && <Footer />}
          </>
        )}
      </div>
    );
  }
);

export default ScreenWrapper;
