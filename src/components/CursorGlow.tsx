"use client";

import { useEffect } from "react";

/**
 * Tracks the pointer and writes its viewport position into `--hero-cursor-x/y`
 * on <body>, which the site-wide background overlay (#page-container::after)
 * reads to render the cursor-follow glow. Desktop fine-pointer only; throttled
 * with requestAnimationFrame.
 */
export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    let lastClientX = 0;
    let lastClientY = 0;

    const flush = () => {
      frame = 0;

      // Resolve the cursor position against the background element's box, since
      // that is the box `::after`'s radial-gradient/mask percentages resolve
      // against (it starts below the sticky header and can exceed the viewport
      // on scrolling pages). Viewport percentages would be vertically offset.
      const target =
        document.getElementById("page-container") ??
        document.querySelector(".appBackground");

      if (!target) {
        return;
      }

      const bounds = target.getBoundingClientRect();
      const x = ((lastClientX - bounds.left) / bounds.width) * 100;
      const y = ((lastClientY - bounds.top) / bounds.height) * 100;

      document.body.style.setProperty(
        "--hero-cursor-x",
        `${Math.min(100, Math.max(0, x))}%`,
      );
      document.body.style.setProperty(
        "--hero-cursor-y",
        `${Math.min(100, Math.max(0, y))}%`,
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      lastClientX = event.clientX;
      lastClientY = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}
