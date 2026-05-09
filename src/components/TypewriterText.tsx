"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterTextProps = {
  strings: string[];
  breakLines?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorSpeed?: number;
  loopDelay?: number | [number, number];
  minVisibleLength?: number;
  nextStringDelay?: number | [number, number];
  speed?: number;
};

function getDelay(
  value: number | [number, number] | undefined,
  fallback: number,
) {
  if (Array.isArray(value)) {
    return value[1] ?? value[0] ?? fallback;
  }

  return value ?? fallback;
}

export function TypewriterText({
  strings,
  breakLines = false,
  cursor = true,
  cursorChar = "|",
  cursorSpeed = 1000,
  loopDelay = 1000,
  minVisibleLength = 0,
  nextStringDelay = 750,
  speed = 80,
}: TypewriterTextProps) {
  const safeStrings = useMemo(() => strings.filter(Boolean), [strings]);
  const [index, setIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const current = safeStrings[index] ?? "";

  useEffect(() => {
    if (!safeStrings.length) {
      return undefined;
    }

    let delay = speed;

    if (!isDeleting && visibleLength === current.length) {
      delay = getDelay(nextStringDelay, 750);
    } else if (isDeleting && visibleLength === minVisibleLength) {
      delay = getDelay(loopDelay, 1000);
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && visibleLength < current.length) {
        setVisibleLength((length) => length + 1);
        return;
      }

      if (!isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (visibleLength > minVisibleLength) {
        setVisibleLength((length) => length - 1);
        return;
      }

      setIsDeleting(false);
      setIndex((value) => (value + 1) % safeStrings.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    current.length,
    index,
    isDeleting,
    loopDelay,
    minVisibleLength,
    nextStringDelay,
    safeStrings.length,
    speed,
    visibleLength,
  ]);

  useEffect(() => {
    if (!cursor) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setShowCursor((value) => !value);
    }, cursorSpeed);

    return () => window.clearInterval(interval);
  }, [cursor, cursorSpeed]);

  const text = current.slice(0, visibleLength);

  return (
    <span style={{ whiteSpace: breakLines ? "normal" : "nowrap" }}>
      {text}
      {cursor ? (
        <span style={{ opacity: showCursor ? 1 : 0 }}>{cursorChar}</span>
      ) : null}
    </span>
  );
}
