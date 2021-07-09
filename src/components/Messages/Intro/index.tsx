import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroLogo from "../../../assets/room-intro.svg";
import LineAlert from "../LineAlert";

interface IntroProps {
  roomName?: string;
  timestamp?: any;
}

const Intro: FC<IntroProps> = ({ roomName, timestamp }) => {
  const convertedTimestamp =
    "Created on " +
    new Date(timestamp?.toDate()).toDateString() +
    " at " +
    new Date(timestamp?.toDate()).toLocaleTimeString();

  return (
    <>
      <IntroContainer>
        <img src={IntroLogo} />
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
    my-4
    font-semibold
    text-center
  `}

  max-width: 23em;
`;
