import { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import FlipMove from "react-flip-move";
import { RoomType } from "../../typings/RoomType";
import { BlockMessagesType } from "../../typings/BlockMessagesType";
import Intro from "./Intro";
import BlockMessages from "./BlockMessages";
import SendingArea from "../Input/SendingArea";
import { db } from "../../firebase";

interface IMessagesProps {
  selectedRoom?: RoomType;
}

const Messages: FC<IMessagesProps> = ({ selectedRoom }) => {
  const [roomMessages, setRoomMessages] = useState<BlockMessagesType[]>([]);
  const [currentBlockMessagesId, setCurrentBlockMessagesId] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const getSelectedRoomMessages = () => {
    if (selectedRoom) {
      db.collection("roomMessages")
        .where("roomId", "==", selectedRoom.id)
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const blockMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            roomId: doc.data().roomId,
            timestamp: doc.data().timestamp,
          }));

          setRoomMessages(blockMessages);
        });
    }
  };

  const getCurrentBlockMessagesId = () => {
    if (roomMessages.length) {
      const latestBlockMessagesTimestamp = new Date(
        roomMessages[roomMessages.length - 1].timestamp.toDate()
      ).toDateString();
      const currentTimestamp = new Date().toDateString();

      if (latestBlockMessagesTimestamp === currentTimestamp)
        setCurrentBlockMessagesId(roomMessages[roomMessages.length - 1].id);
    } else {
      setCurrentBlockMessagesId("");
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current)
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    getSelectedRoomMessages();
  }, [selectedRoom]);

  useEffect(() => {
    getCurrentBlockMessagesId();
  }, [roomMessages]);

  return (
    <MessagesContainer ref={messagesContainerRef}>
      <Intro
        roomName={selectedRoom?.name}
        roomBackground={selectedRoom?.background}
        timestamp={selectedRoom?.timestamp}
      />

      <BlockMessagesWrapper>
        <FlipMove leaveAnimation="fade">
          {roomMessages.map((roomMessage) => (
            <BlockMessages
              selectedRoomTimestamp={selectedRoom?.timestamp}
              key={roomMessage.id}
              {...roomMessage}
            />
          ))}
        </FlipMove>
      </BlockMessagesWrapper>

      <Marginer />

      <SendingArea
        scrollToBottom={scrollToBottom}
        roomId={selectedRoom?.id}
        blockMessagesId={currentBlockMessagesId}
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
    overflow-x-hidden
    overflow-y-auto
  `}

  scroll-behavior: smooth;

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

const BlockMessagesWrapper = styled.div`
  ${tw`
    flex-1
  `}
`;
