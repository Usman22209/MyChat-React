import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "@styles/animation.css";

interface ImageContainerProps {
  image: string;
  index: number;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ image, index }) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl sm:min-h-[220px] min-h-[130px] group overflow-hidden flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-full h-full">
            <LazyLoadImage
              src={image}
              alt={`Company ${index + 1}`}
              effect="blur"
              className={`
                w-full h-full object-cover
                transition-all duration-300
                rounded-md
      
                group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
              `}
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-xl pointer-events-none" />
    </div>
  );
};

export default ImageContainer;
