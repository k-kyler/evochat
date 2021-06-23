import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import WebLogoImage from "../../assets/web-logo.svg";
import { SCREENS } from "../../screens";

const SignIn: FC = () => {
  return (
    <SignInContainer>
      <InnerContainer>
        <Link to="/">
          <img src={WebLogoImage} />
        </Link>
        <SignInTitle>Welcome to Evochat</SignInTitle>
        <Button theme="facebook" content="Sign in with Facebook" />
        <Button theme="google" content="Sign in with Google" />
      </InnerContainer>
    </SignInContainer>
  );
};

export default SignIn;

const SignInContainer = styled.div`
  ${tw`
    h-full
    grid
    place-items-center
  `}
`;

const InnerContainer = styled.div`
  ${tw`
    bg-gray-600
    h-full
    w-full
    flex
    flex-col
    items-center
    justify-center
  `}

  img {
    height: 4rem;

    @media (min-width: ${SCREENS["2xl"]}) {
      height: 7rem;
    }
  }

  button {
    margin-top: 1rem;
  }
`;

const SignInTitle = styled.h1`
  ${tw`
    mt-2
    mb-6
    text-xl
    text-white
    font-black
    2xl:text-4xl
  `}
`;
