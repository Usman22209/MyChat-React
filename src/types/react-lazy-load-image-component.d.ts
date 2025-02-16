declare module "react-lazy-load-image-component" {
  import { FC, ImgHTMLAttributes } from "react";

  interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    effect?: string;
    placeholder?: React.ReactNode;
    visibleByDefault?: boolean;
    useIntersectionObserver?: boolean;
  }

  export const LazyLoadImage: FC<LazyLoadImageProps>;
}
