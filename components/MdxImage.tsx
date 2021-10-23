import React from "react";
import Image from "next/image";
import loadImage from "./loadImage";

export interface MdxImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

function MdxImage(props: MdxImageProps) {
  return <Image {...props} loader={loadImage} unoptimized />;
}

export default MdxImage;
