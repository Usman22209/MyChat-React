import "@styles/animation.css";
const SkeletonLoader = ({ width, height }: { width: string | number; height: string | number }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700"
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />
    </div>
  );
};

export default SkeletonLoader;
