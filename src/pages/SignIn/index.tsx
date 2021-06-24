import { FC, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import WebLogoImage from "../../assets/web-logo.svg";
import { SCREENS } from "../../screens";
import { AuthContext } from "../../contexts/Auth/AuthProvider";
import { Redirect } from "react-router-dom";
import { auth, googleAuthProvider, facebookAuthProvider } from "../../firebase";

const SignIn: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const signInHandler = (provider: any) => {
    auth
      .signInWithPopup(provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {user ? (
        <Redirect to="/chat" />
      ) : (
        <SignInContainer>
          <InnerContainer>
            <Link to="/">
              <img src={WebLogoImage} />
            </Link>
            <SignInTitle>Welcome to Evochat</SignInTitle>
            <Button
              theme="facebook"
              content="Sign in with Facebook"
              clickHandler={() => signInHandler(facebookAuthProvider)}
            />
            <Button
              theme="google"
              content="Sign in with Google"
              clickHandler={() => signInHandler(googleAuthProvider)}
            />
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
