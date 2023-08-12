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

  let actualWidth: number|undefined;
  if (typeof width === "string") {
    actualWidth = parseInt(width);
  } else if (typeof width === "number") {
    actualWidth = width;
  }
  let actualHeight: number|undefined;
  if (typeof height === "string") {
    actualHeight = parseInt(height);
  } else if (typeof height === "number") {
    actualHeight = height;
  }

  return (
    <Image
      alt={alt ?? ""}
      width={actualWidth}
      height={actualHeight}
      src={src}
      loader={loadImage}
      unoptimized
    />
  );
}

export default MdxImage;
