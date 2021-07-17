import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroLogo from "../../../assets/room-intro.svg";
import LineAlert from "../LineAlert";

interface IntroProps {
  roomName?: string;
  roomBackground?: string;
  timestamp?: any;
}

const Intro: FC<IntroProps> = ({ roomName, roomBackground, timestamp }) => {
  const convertedTimestamp =
    "Created on " +
    new Date(timestamp?.toDate()).toDateString() +
    ", " +
    new Date(timestamp?.toDate()).toLocaleTimeString();

  return (
    <>
      <IntroContainer>
        {roomBackground ? (
          <BackgroundContainer background={roomBackground} />
        ) : (
          <img src={IntroLogo} />
        )}
        <Content>Welcome to {roomName}</Content>
      </IntroContainer>
      <LineAlert content={convertedTimestamp} />
    </>
  );
};

export default Intro;

const IntroContainer = styled.div`
  ${tw`
    py-4
    flex
    flex-col
    items-center
    pointer-events-none
    select-none
  `}

  img {
    ${tw`
      h-32
    `}
  }
`;

const Content = styled.h3`
  ${tw`
    text-3xl
    mt-4
    font-semibold
    text-center
  `}

  max-width: 23em;
`;

const BackgroundContainer = styled.div<{ background: string }>`
  ${tw`
    h-32
    w-32
    bg-cover
    bg-center
    bg-no-repeat
  `}

  border-radius: 50%;
  background-image: url(${({ background }) => background});
`;
