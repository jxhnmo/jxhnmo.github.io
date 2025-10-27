import React, { useState, useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Switch from "@radix-ui/react-switch";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./navbar.css";
import logo from "../assets/jm_logo.png";

const ThemeSwitch = () => {
  const [isLightTheme, setIsLightTheme] = useState(
    document.body.getAttribute("data-theme") === "light"
  );

  useEffect(() => {
    if (isLightTheme) {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <Switch.Root
      className="SwitchRoot"
      id="theme"
      onCheckedChange={toggleTheme}
      checked={isLightTheme}
    >
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <div className="justify-start">
        <div id="icon" style={{ cursor: "pointer", padding: "8px" }}>
          <img
            src={logo}
            height="50px"
            alt="jm logo"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            onClick={() => navigate("/about")}
            className="NavigationMenuTrigger"
          >
            About <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <a className="Callout" href="/">
                    <div className="CalloutHeading">Me</div>
                    <p className="CalloutText mt-3 mb-4">
                      Passionate gamer and software dev
                    </p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <div id="nav">
                <ListItem href="/#/about" title="About">
                  me!
                </ListItem>
              </div>
              <div id="nav">
                <ListItem href="/#/links" title="Links">
                  relevant links of mine
                </ListItem>
              </div>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            onClick={() => navigate("/experience")}
            className="NavigationMenuTrigger"
          >
            Experience <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <div id="nav">
                <ListItem title="Experience" href="/#/experience">
                  my work experiences
                </ListItem>
              </div>
              <div id="nav">
                <ListItem title="🔒 Resume" href="/#/resume">
                  my resume !
                </ListItem>
              </div>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <div id="nav">
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="/#/projects"
            >
              Projects
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </div>

        <div id="nav">
          <NavigationMenu.Item>
            <ThemeSwitch />
          </NavigationMenu.Item>
        </div>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default Navbar;
