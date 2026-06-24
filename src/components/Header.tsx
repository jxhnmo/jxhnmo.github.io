"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navMenus, siteConfig } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const ListItem = ({
  className,
  children,
  href,
  title,
}: {
  className?: string;
  children: React.ReactNode;
  href: string;
  title: string;
}) => (
  <li className="navItem">
    <NavigationMenu.Link asChild>
      <Link className={classNames("ListItemLink", className)} href={href}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </Link>
    </NavigationMenu.Link>
  </li>
);

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateViewportOffset = () => {
      const trigger = root.querySelector<HTMLElement>(
        '.NavigationMenuTrigger[data-state="open"]',
      );
      if (!trigger) return;
      const rootRect = root.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const triggerBottom = triggerRect.bottom - rootRect.top;
      const triggerCenter = triggerRect.left + triggerRect.width / 2 - rootRect.left;
      root.style.setProperty("--viewport-top", `${triggerBottom}px`);
      root.style.setProperty("--viewport-anchor-x", `${triggerCenter}px`);
    };

    updateViewportOffset();

    // On a fresh open (closed -> open), the viewport still carries the size
    // of whichever menu was open last, so the width/height transition would
    // animate from that stale size. Snap to the correct size without a
    // transition on fresh opens; keep it for trigger-to-trigger moves.
    let wasOpen = false;
    const handleMutation = () => {
      updateViewportOffset();
      const viewport = root.querySelector<HTMLElement>(".NavigationMenuViewport");
      const isOpen = viewport?.getAttribute("data-state") === "open";
      if (viewport && isOpen && !wasOpen) {
        viewport.classList.add("snapSize");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => viewport.classList.remove("snapSize")),
        );
      }
      wasOpen = isOpen;
    };

    const observer = new MutationObserver(handleMutation);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    });
    window.addEventListener("resize", updateViewportOffset);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateViewportOffset);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      wasOpenRef.current = true;
      const overlay = overlayRef.current;
      const firstFocusable = overlay?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      firstFocusable?.focus();
    } else if (wasOpenRef.current) {
      burgerButtonRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("hasOpenMobileMenu");

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusable = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("hasOpenMobileMenu");
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <NavigationMenu.Root
        className={classNames("NavigationMenuRoot", {
          hasOpenMobileMenu: isMobileMenuOpen,
        })}
        ref={rootRef}
      >
        <div className="justify-start">
          <div id="icon" style={{ cursor: "pointer" }}>
            <Link href="/" aria-label="John Mo home" onClick={closeMobileMenu}>
              <Image
                src={siteConfig.logo}
                alt="jm logo"
                width={56}
                height={56}
                priority
              />
            </Link>
          </div>
        </div>

        <button
          type="button"
          ref={burgerButtonRef}
          className={classNames("MobileMenuButton", { isOpen: isMobileMenuOpen })}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-nav-overlay"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
        </button>

        <NavigationMenu.List className="NavigationMenuList">
          {navMenus.map((menu) => (
            <NavigationMenu.Item key={menu.href}>
              <NavigationMenu.Trigger
                onClick={() => router.push(menu.href)}
                className="NavigationMenuTrigger"
              >
                {menu.label} <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className={classNames("List", menu.className)}>
                  {menu.callout ? (
                    <li style={{ gridRow: `span ${menu.items.length}` }}>
                      <NavigationMenu.Link asChild>
                        <Link className="Callout" href={menu.callout.href}>
                          <div className="CalloutHeading">
                            {menu.callout.label}
                          </div>
                          <p className="CalloutText mt-3 mb-4">
                            {menu.callout.description}
                          </p>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ) : null}

                  {menu.items.map((item) => (
                    <ListItem
                      href={item.href}
                      title={item.label}
                      key={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ))}

          <NavigationMenu.Item className="navItem">
            <NavigationMenu.Link asChild>
              <Link className="NavigationMenuLink" href="/projects">
                Projects
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className="navItem">
            <ThemeToggle />
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>

      <div
        ref={overlayRef}
        id="site-nav-overlay"
        className={classNames("MobileNavOverlay", { isOpen: isMobileMenuOpen })}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="MobileNavOverlayInner">
          <div className="MobileNavBody">
            <nav className="MobileNavSections" aria-label="Site sections">
            {navMenus.map((menu) => {
              const subItems = [
                ...(menu.callout
                  ? [{ label: menu.callout.label, href: menu.callout.href }]
                  : []),
                ...menu.items.filter((item) => item.href !== menu.href),
              ];
              return (
                <section key={menu.href} className="MobileNavSection">
                  <Link
                    href={menu.href}
                    className="MobileNavSectionHeading"
                    onClick={closeMobileMenu}
                  >
                    {menu.label}
                  </Link>
                  {subItems.length > 0 ? (
                    <ul className="MobileNavSubList">
                      {subItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="MobileNavSubLink"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}

            <Link
              href="/projects"
              className="MobileNavSectionHeading MobileNavStandalone"
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
          </nav>

          <div className="MobileNavFooter">
            <a
              href={`mailto:${siteConfig.email}`}
              className="MobileNavContact"
              onClick={closeMobileMenu}
            >
              <svg
                className="MobileNavContactIcon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {siteConfig.email}
            </a>
            <div className="MobileNavTheme">
              <span className="MobileNavThemeLabel">Theme</span>
              <ThemeToggle />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
