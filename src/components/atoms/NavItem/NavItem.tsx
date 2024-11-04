import React, { useEffect, useRef, useState } from "react";
import StyledNavItem from "@components/atoms/NavItem/NavItem.styled.tsx";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";

export interface NavItemProps {
  translationKey: string;
  linkTo: string;
  onNavItemClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  translationKey,
  linkTo,
  onNavItemClick,
}) => {
  const location = useLocation();
  const [url, setUrl] = useState<string | null>(null);
  const navItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  useEffect(() => {
    const isActive = () => {
      const active: boolean =
        url === `/${linkTo}` || url === linkTo ? true : false;
      if (navItemRef.current) {
        if (navItemRef.current) {
          if (active) {
            navItemRef.current.style.opacity = "0.7";
          } else {
            navItemRef.current.style.opacity = "1";
          }
        }
      }
    };
    isActive();
  }, [url, linkTo]);

  return (
    <StyledNavItem
      role={"link"}
      to={linkTo}
      ref={navItemRef}
      onClick={onNavItemClick}
    >
      <FormattedMessage id={translationKey} />
    </StyledNavItem>
  );
};

export default NavItem;
