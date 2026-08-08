"use client";

import type { ReactNode } from "react";

export function SectionLink({
  children,
  className,
  sectionId,
}: {
  children: ReactNode;
  className?: string;
  sectionId: string;
}) {
  function moveToSection() {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "auto", block: "start" });
  }

  return <button className={className} type="button" onClick={moveToSection}>{children}</button>;
}
