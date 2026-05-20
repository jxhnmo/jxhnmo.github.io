"use client";

import * as Switch from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.removeAttribute("data-theme");
    }

    document.documentElement.removeAttribute("data-theme");
  }, [isLight]);

  return (
    <Switch.Root
      checked={isLight}
      onCheckedChange={setIsLight}
      className="SwitchRoot"
      aria-label="Toggle light theme"
    >
      <Switch.Thumb className="SwitchThumb">
        {isLight ? (
          <SunIcon className="SwitchIcon" aria-hidden />
        ) : (
          <MoonIcon className="SwitchIcon" aria-hidden />
        )}
      </Switch.Thumb>
    </Switch.Root>
  );
}
