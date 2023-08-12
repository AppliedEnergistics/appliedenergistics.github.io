import { ImageLoader, ImageLoaderProps } from "next/image";

const loadImage: ImageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export default loadImage;
