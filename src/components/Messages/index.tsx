import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import Intro from "./Intro";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  return (
    <MessagesContainer>
      <Intro
        roomName={selectedRoom?.name}
        timestamp={selectedRoom?.timestamp}
      />
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    w-full
    px-4
  `}
`;
