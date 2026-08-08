"use client";

import { useLayoutEffect } from "react";

const LEGACY_SECTION_HASHES = new Set(["#directory", "#compare", "#guide", "#research", "#methodology"]);

export function ScrollManager() {
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    if (!LEGACY_SECTION_HASHES.has(window.location.hash)) return;

    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
