import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Button from "../../components/Button";
import WebLogoImage from "../../assets/web-logo.svg";
import { SCREENS } from "../../screens";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";

const SignIn: FC = () => {
  const { user, googleSignInHandler, facebookSignInHandler } = useAuth();

  return (
    <>
      {user ? (
        <Redirect to="/chat" />
      ) : (
        <SignInContainer>
          <InnerContainer>
            <img src={WebLogoImage} />
            <SignInTitle>Welcome to Evochat</SignInTitle>
            <Button
              theme="facebook"
              content="Sign in with Facebook"
              clickHandler={facebookSignInHandler}
            />
            <Button
              theme="google"
              content="Sign in with Google"
              clickHandler={googleSignInHandler}
            />
            <Link to="/">
              <BackToHomeContainer>
                <BackToHomeIcon>
                  <IoReturnUpBackSharp />
                </BackToHomeIcon>
                <BackToHomeContent>Back to home</BackToHomeContent>
              </BackToHomeContainer>
            </Link>
          </InnerContainer>
        </SignInContainer>
      )}
    </>
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
    height: 5rem;

    @media (min-width: ${SCREENS.md}) {
      height: 6rem;
    }

    @media (min-width: ${SCREENS.lg}) {
      height: 7rem;
    }

    @media (min-width: ${SCREENS["2xl"]}) {
      height: 8rem;
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
    text-3xl
    text-white
    font-black
    lg:text-4xl
  `}
`;

const BackToHomeContainer = styled.div`
  ${tw`
    flex
    items-center
    mt-4
  `}
`;

const BackToHomeIcon = styled.span`
  ${tw`
    text-gray-400
    text-sm
    mr-1
    2xl:text-base
  `}
`;

const BackToHomeContent = styled.p`
  ${tw`
    text-sm
    text-gray-400
    hover:underline
    transition-all
    duration-300
    ease-in-out
    2xl:text-base
  `}
`;
