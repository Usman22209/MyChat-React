import { memo, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "@styles/animation.css";

interface ImageContainerProps {
  image: string;
  index: number;
  className?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = memo(({ image, index, className = "" }) => {
  const computedClassName = useCallback(
    () =>
      `relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl sm:min-h-[220px] min-h-[130px] 
       group overflow-hidden flex items-center justify-center transition-transform 
       duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl ${className}`,
    [className]
  );

  return (
    <div className={computedClassName()}>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-800 via-indigo-700 to-purple-800 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500 blur-2xl group-hover:blur-lg"
      ></div>

      <div className="relative w-full h-full flex items-center justify-center">
        <LazyLoadImage
          src={image}
          alt={`Company ${index + 1}`}
          effect="blur"
          className="w-full h-full object-contain transition-transform duration-500 transform 
                     rounded-lg group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
        />
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 
                      group-hover:shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
});

export default ImageContainer;
