import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import { MessageType } from "../../typings/MessageType";
import Intro from "./Intro";
import Message from "./Message";
import SendingArea from "./SendingArea";
import { useUsers } from "../../contexts/UsersContext";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { users } = useUsers();

  const getSelectedRoomMessages = () => {
    const selectedRoomMessages = selectedRoom?.messages?.map((message) => {
      return users?.map((user) => {
        if (message.uid === user.uid) {
          return {
            id: message.id,
            uid: message.uid,
            username: user.username,
            avatar: user.avatar,
            message: message.message,
            timestamp:
              typeof message.timestamp !== "string"
                ? new Date(message.timestamp.toDate()).toDateString() +
                  ", " +
                  new Date(message.timestamp.toDate()).toLocaleTimeString()
                : message.timestamp,
            type: message.type,
          };
        }
      });
    });
    const convertedRoomMessages = selectedRoomMessages?.map(
      ([message]: any) => message
    );

    if (convertedRoomMessages?.length)
      setMessages(convertedRoomMessages as any);
  };

  useEffect(() => {
    if (selectedRoom?.messages?.length) getSelectedRoomMessages();
    if (!selectedRoom?.messages?.length) setMessages([]);
  }, [selectedRoom]);

  return (
    <MessagesContainer>
      <Intro
        roomName={selectedRoom?.name}
        timestamp={selectedRoom?.timestamp}
      />

      <MessagesWrapper>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </MessagesWrapper>

      <Marginer />

      <SendingArea
        roomId={selectedRoom?.id}
        messages={messages}
        setMessages={setMessages}
      />
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
    overflow-y-auto
  `}

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #2f3136;
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-600
      rounded-lg
    `}
  }

  /* Firefox */
  scrollbar-width: auto;
  scrollbar-color: #4b5563 #2f3136;
`;

const Marginer = styled.div`
  ${tw`
    pb-10
  `}
`;

const MessagesWrapper = styled.div`
  ${tw`
    flex-1
  `}
`;
