import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import { MessageType } from "../../typings/MessageType";
import Intro from "./Intro";
import Message from "./Message";
import SendingArea from "./SendingArea";

import { useAuth } from "../../contexts/AuthContext";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  const { user } = useAuth();

  const testMessages: MessageType[] = [
    {
      id: "1",
      uid: user?.uid,
      username: String(user?.displayName),
      avatar: String(user?.photoURL),
      message: "Hello my awesome room",
      timestamp: "Tue Jul 06 2021, 11:45:03 PM",
      type: "text",
      active: true,
    },
    {
      id: "2",
      uid: "abc",
      username: String(user?.displayName),
      avatar: String(user?.photoURL),
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur non aperiam consequatur inventore at esse iste sint nobis veritatis sequi quaerat id ipsum earum dolor eligendi architecto pariatur, consequuntur cumque?",
      timestamp: "Tue Jul 06 2021, 11:45:57 PM",
      type: "text",
      active: true,
    },
  ];

  return (
    <MessagesContainer>
      <Intro
        roomName={selectedRoom?.name}
        timestamp={selectedRoom?.timestamp}
      />

      {testMessages.map((message) => (
        <Message key={message.id} {...message} />
      ))}

      <SendingArea />
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    px-4
    relative
  `}
`;
