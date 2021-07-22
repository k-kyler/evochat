import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import FlipMove from "react-flip-move";
import { RoomType } from "../../typings/RoomType";
import { MessageType } from "../../typings/MessageType";
import Intro from "./Intro";
import Message from "./Message";
import SendingArea from "../Input/SendingArea";
import { db } from "../../firebase";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getSelectedRoomMessages = () => {
    db.collection("rooms")
      .doc(selectedRoom?.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const roomMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          username: doc.data().username,
          avatar: doc.data().avatar,
          timestamp: doc.data().timestamp,
          type: doc.data().type,
          message: doc.data().message,
          image: doc.data().image,
          video: doc.data().video,
          file: doc.data().file,
        }));

        setMessages(roomMessages);
      });
  };

  const scrollToBottom = () => {
    if (messages.length && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getSelectedRoomMessages();
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MessagesContainer>
      <Intro
        roomName={selectedRoom?.name}
        roomBackground={selectedRoom?.background}
        timestamp={selectedRoom?.timestamp}
      />

      <MessagesWrapper>
        <FlipMove leaveAnimation="fade">
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </FlipMove>
      </MessagesWrapper>

      <Marginer ref={messagesEndRef} />

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
    overflow-x-hidden
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
    pb-8
  `}
`;

const MessagesWrapper = styled.div`
  ${tw`
    flex-1
  `}
`;
