import React, { PropsWithChildren } from "react";

function MdxParagraph({ children }: PropsWithChildren<{}>) {
  return <div className="block">{children}</div>;
}

export default MdxParagraph;
