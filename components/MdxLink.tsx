import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

function MdxLink({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...rest}>{children}</a>;
  } else {
    return (
      <Link passHref href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }
}

export default MdxLink;
