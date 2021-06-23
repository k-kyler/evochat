import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../Logo";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <NavBarContainer>
      <LogoContainer>
        <Link to="/">
          <Logo color="white" />
        </Link>
      </LogoContainer>

      <NavItems />
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  ${tw`
    flex
    items-center
    w-full
    max-w-screen-2xl
    justify-between
    px-4
    lg:pl-12
    lg:pr-12
  `}

  min-height: 4.5rem;
`;

const LogoContainer = styled.div``;
