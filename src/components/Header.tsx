"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <div className="justify-start">
        <div id="icon" style={{ cursor: "pointer", padding: "8px" }}>
          <Link href="/" aria-label="John Mo home" onClick={closeMobileMenu}>
            <Image
              src={siteConfig.logo}
              alt="jm logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="MobileMenuButton"
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="site-navigation"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
      >
        {isMobileMenuOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
      </button>

      <NavigationMenu.List
        id="site-navigation"
        className={classNames("NavigationMenuList", {
          isMobileMenuOpen,
        })}
      >
        {navMenus.map((menu) => (
          <NavigationMenu.Item key={menu.href}>
            <NavigationMenu.Trigger
              onClick={() => {
                closeMobileMenu();
                router.push(menu.href);
              }}
              className="NavigationMenuTrigger"
            >
              {menu.label} <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className={classNames("List", menu.className)}>
                {menu.callout ? (
                  <li style={{ gridRow: "span 3" }}>
                    <NavigationMenu.Link asChild>
                      <Link
                        className="Callout"
                        href={menu.callout.href}
                        onClick={closeMobileMenu}
                      >
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
                    className="MobileMenuNestedLink"
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
            <Link
              className="NavigationMenuLink"
              href="/projects"
              onClick={closeMobileMenu}
            >
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
  );
}
