import { ImageLoader } from "next/image";
import { ImageLoaderProps } from "next/dist/client/image";

const loadImage: ImageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

export default loadImage;
