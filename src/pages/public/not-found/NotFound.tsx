import React from "react";
import { ArrowRight } from "lucide-react";
import ScreenWrapper from "@components/screen-wrapper";

const NotFoundPage = () => {
  return (
    <ScreenWrapper maxWidth="full" padding="p-0">
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-7xl font-bold text-gray-900 dark:text-white">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2 text-lg"
          >
            Go Home <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </ScreenWrapper>
  );
};

export default NotFoundPage;
