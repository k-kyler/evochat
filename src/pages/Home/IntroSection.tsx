import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroImage from "../../assets/intro.gif";
import BlobImage from "../../assets/blob.svg";
import { SCREENS } from "../../screens";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const IntroSection: FC = () => {
  const { user } = useAuth();

  return (
    <IntroSectionContainer>
      <LeftSide>
        <Slogan>Feel The Awesome Chat Services With Your Friends</Slogan>
        <Description>
          Join with me and you will get awesome experience with a lot of cool
          features while using my chat services
        </Description>
        <ButtonsContainer>
          <Link to="signin">
            <Button
              content={`${user ? "Open Evochat" : "Get Started"}`}
              theme="filled"
            />
          </Link>
        </ButtonsContainer>
      </LeftSide>
      <RightSide>
        <BlobContainer>
          <img src={BlobImage} />
        </BlobContainer>
        <IntroIllustration>
          <img src={IntroImage} />
        </IntroIllustration>
      </RightSide>
    </IntroSectionContainer>
  );
};

export default IntroSection;

const IntroSectionContainer = styled.div`
  ${tw`
    w-full
    max-w-screen-2xl
    pl-3
    pr-3
    lg:pl-12
    lg:pr-12
    flex
    justify-between
    mt-16
    md:mt-24
  `}
`;

const LeftSide = styled.div`
  ${tw`
    w-1/2
    flex
    flex-col
  `}
`;

const RightSide = styled.div`
  ${tw`
    w-1/2
    flex
    flex-col
    mt-20
    relative
  `}
`;

const Slogan = styled.h1`
  ${tw`
    mb-4
    font-bold
    text-white
    text-2xl
    sm:text-3xl
    sm:leading-snug
    md:text-5xl
    md:font-extrabold
    lg:font-black
    lg:leading-normal
    xl:text-6xl
    xl:leading-relaxed
  `}
`;

const Description = styled.p`
  ${tw`
    text-gray-300
    max-h-full
    mb-4
    text-xs
    lg:text-sm
    xl:text-lg
  `}
`;

const BlobContainer = styled.div`
  position: absolute;
  top: -9em;
  right: -6em;
  width: 24em;
  height: 10em;
  transform: rotate(-30deg);
  z-index: -1;

  img {
    height: auto;
    max-height: max-content;
    width: 100%;
  }

  @media (min-width: ${SCREENS.sm}) {
    width: 40em;
    max-height: 10em;
    top: -16em;
    right: -9em;
    transform: rotate(-25deg);
  }

  @media (min-width: ${SCREENS.lg}) {
    width: 50em;
    max-height: 30em;
    top: -15em;
    right: -7em;
    transform: rotate(-30deg);
  }

  @media (min-width: ${SCREENS.xl}) {
    width: 70em;
    max-height: 30em;
    top: -25em;
    right: -15em;
    transform: rotate(-20deg);
  }

  @media (min-width: ${SCREENS["2xl"]}) {
    width: 70em;
    max-height: 30em;
    top: -22em;
    right: -15em;
    transform: rotate(336deg);
  }
`;

const IntroIllustration = styled.div`
  position: absolute;
  top: -3.5em;
  right: -0.3em;
  width: auto;
  height: 10em;

  img {
    border-radius: 50%;
    width: auto;
    height: 100%;
    max-width: fit-content;
  }

  @media (min-width: ${SCREENS.sm}) {
    height: 16em;
    top: -6.5em;
    right: 0.5em;
  }

  @media (min-width: ${SCREENS.lg}) {
    height: 23em;
    top: -5em;
    right: -1.5em;
  }

  @media (min-width: ${SCREENS.xl}) {
    height: 31em;
    top: -9em;
    right: -2em;
  }

  @media (min-width: ${SCREENS["2xl"]}) {
    height: 31em;
    top: -8em;
    right: -8em;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;
