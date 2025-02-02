
declare module "*.svg" {
    import React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export { ReactComponent };
    export default src;
  }
  
  // Declare support for image imports
  declare module "*.png";
  declare module "*.jpg";
  declare module "*.jpeg";
  declare module "*.gif";
  declare module "*.webp";
  declare module "*.avif";
  