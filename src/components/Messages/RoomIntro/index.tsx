import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RoomIntroLogo from "../../../assets/room-intro.svg";

interface IRoomIntroProps {
  roomName?: string;
}

const RoomIntro: FC<IRoomIntroProps> = ({ roomName }) => {
  return (
    <RoomIntroContainer>
      <img src={RoomIntroLogo} />
      <Content>Welcome to {roomName}</Content>
    </RoomIntroContainer>
  );
};

export default RoomIntro;

const RoomIntroContainer = styled.div`
  ${tw`
    py-10
    flex
    flex-col
    items-center
  `}

  img {
    ${tw`
      h-24
    `}
  }
`;

const Content = styled.h3`
  ${tw`
    text-2xl
    my-3
    font-semibold
    text-center
  `}

  max-width: 23em;
`;
