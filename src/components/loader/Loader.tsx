import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center gap-6 animate-fade-in">
      <div className="relative">
        <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="h-14 w-14 bg-indigo-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
