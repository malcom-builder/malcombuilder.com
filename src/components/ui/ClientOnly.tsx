"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then((mod) => mod.CustomCursor), { ssr: false });
const AmbientOrb = dynamic(() => import("@/components/ui/AmbientOrb").then((mod) => mod.AmbientOrb), { ssr: false });

export function ClientOnly() {
  return (
    <>
      <AmbientOrb />
      <CustomCursor />
    </>
  );
}
