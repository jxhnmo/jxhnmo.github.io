import React from "react";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useNavigate } from "react-router-dom"
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './navbar.css';
import logo from '../assets/jm_logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">

      <div class="justify-start">
        <IconButton aria-label="delete">
          <th id="noBorder">
            <img
              src={logo}
              height="40px"
              onClick={() => navigate('/')}
            />
          </th>
        </IconButton>
      </div>

      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger onClick={() => navigate('/about')} className="NavigationMenuTrigger">
            About <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: 'span 3' }}>
                <NavigationMenu.Link asChild>
                  <a className="Callout" href="/">
                    <div className="CalloutHeading mt-5 mb-2">Me</div>
                    <p className="CalloutText mt-3 mb-4">Passionate gamer and software dev</p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href="/about" title="About">
                a longer description of me by me!
              </ListItem>
              <ListItem href="/links" title="Links">
                relevant links of mine
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger onClick={() => navigate('/*')} className="NavigationMenuTrigger">
            Experience <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuList">
            <ul className="List two">
              <ListItem title="Experience" href="/*">
                my work experiences
              </ListItem>
              <ListItem title="Resume" href="/*">
                my resume !
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/*">
            Projects
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/*">
            Contact
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root >
  );
};

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

export default Navbar;