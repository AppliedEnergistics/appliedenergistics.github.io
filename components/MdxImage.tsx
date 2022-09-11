import React, { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import Image from "next/image";
import loadImage from "./loadImage";

export interface MdxImageProps {
  src: string | undefined;
  alt?: string;
  width: number;
  height: number;
}

function MdxImage({
  src,
  alt,
  width,
  height,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) {
    return null;
  }
  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      src={src}
      loader={loadImage}
      unoptimized
    />
  );
}

export default MdxImage;
