import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface PageLink {
  title: string;
  path: string;
}

interface MenuEntry {
  header: string;
  children: (string | PageLink)[];
}

function FeaturesSideNav() {
  return null;
}

export default FeaturesSideNav;
