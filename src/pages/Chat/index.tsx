import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Chat: FC = () => {
  return (
    <ChatContainer>
      <ListRoomsContainer>List rooms</ListRoomsContainer>

      <RoomOptionsContainer>Room options</RoomOptionsContainer>

      <ChatAreaContainer>Chat area</ChatAreaContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex-col
  `}
`;

const ListRoomsContainer = styled.div`
  ${tw`
  text-white
  `}
`;

const RoomOptionsContainer = styled.div`
  ${tw`
    text-white
  `}
`;

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}
`;
