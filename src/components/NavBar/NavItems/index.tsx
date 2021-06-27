import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../screens";
import { styles } from "./BurgerMenuStyles";

const NavItems: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={styles}>
        <ListContainer>
          <NavItem menu>
            <a href="#about">About</a>
          </NavItem>
          <NavItem menu>
            <a href="#services">Services</a>
          </NavItem>
          <NavItem menu>
            <a href="#contact">Contact</a>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <NavItem>
        <a href="#about">About</a>
      </NavItem>
      <NavItem>
        <a href="#services">Services</a>
      </NavItem>
      <NavItem>
        <a href="#contact">Contact</a>
      </NavItem>
    </ListContainer>
  );
};

export default NavItems;

const ListContainer = styled.ul`
  ${tw`
    list-none
    flex
  `}
`;

const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-white
    text-sm
    md:text-base
    font-medium
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:opacity-80
  `}

  a {
    ${tw`
      font-semibold
    `}
  }

  ${({ menu }) =>
    menu &&
    css`
      ${tw`
        text-xl
        mb-3
      `}
    `}
`;
