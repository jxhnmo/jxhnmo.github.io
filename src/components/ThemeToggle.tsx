"use client";

import * as Switch from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "theme";

// Shared store so every ThemeToggle instance (desktop + mobile nav) stays in sync.
let isLight: boolean | null = null;
const listeners = new Set<() => void>();

// Stored preference wins; otherwise fall back to the OS setting on first visit.
function resolveInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light") return true;
    if (stored === "dark") return false;
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through to the OS.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function getSnapshot(): boolean {
  if (isLight === null) isLight = resolveInitialTheme();
  return isLight;
}

function applyToDom(light: boolean) {
  if (light) {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.removeAttribute("data-theme");
  }
  // Hand the attribute off from <html> (set pre-paint by the inline script) to <body>.
  document.documentElement.removeAttribute("data-theme");
}

// Persist only on an explicit toggle, so the OS preference keeps applying
// until the user actively overrides it.
function setTheme(light: boolean) {
  isLight = light;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, light ? "light" : "dark");
  } catch {
    // Ignore — the in-memory state still drives the current session.
  }
  applyToDom(light);
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function ThemeToggle() {
  // SSR renders dark (matches the markup before the inline script runs).
  const light = useSyncExternalStore(subscribe, getSnapshot, () => false);

  // On mount, reconcile the DOM with the resolved theme (html -> body handoff).
  useEffect(() => {
    applyToDom(getSnapshot());
  }, []);

  return (
    <Switch.Root
      checked={light}
      onCheckedChange={setTheme}
      className="SwitchRoot"
      aria-label="Toggle light theme"
    >
      <Switch.Thumb className="SwitchThumb">
        {light ? (
          <SunIcon className="SwitchIcon" aria-hidden />
        ) : (
          <MoonIcon className="SwitchIcon" aria-hidden />
        )}
      </Switch.Thumb>
    </Switch.Root>
  );
}
