import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import { MessageType } from "../../typings/MessageType";
import Intro from "./Intro";
import Message from "./Message";
import SendingArea from "./SendingArea";
import { useUsers } from "../../contexts/UsersContext";
import { db } from "../../firebase";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { users } = useUsers();

  const getSelectedRoomMessages = () => {
    db.collection("rooms")
      .doc(selectedRoom?.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            type: doc.data().type,
            timestamp: doc.data().timestamp,
            message: doc.data().message,
            username: users?.filter((user) => user.uid === doc.data().uid)[0]
              .username,
            avatar: users?.filter((user) => user.uid === doc.data().uid)[0]
              .avatar,
          }))
        );
      });
  };

  useEffect(() => {
    getSelectedRoomMessages();
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

      <SendingArea roomId={selectedRoom?.id} />
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
