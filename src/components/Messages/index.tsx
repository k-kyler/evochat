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

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const getSelectedRoomMessages = () => {
    if (selectedRoom) {
      db.collection("roomMessages")
        .where("roomId", "==", selectedRoom.id)
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const roomMessages = snapshot.docs.map(async (doc) => {
            const dateMessages = await doc.ref
              .collection("dateMessages")
              .orderBy("timestamp", "asc")
              .get()
              .then((snapshot) => {
                return snapshot.docs.map((doc) => ({
                  id: doc.id,
                  uid: doc.data().uid,
                  username: doc.data().username,
                  avatar: doc.data().avatar,
                  timestamp: doc.data().timestamp,
                  type: doc.data().type,
                  message: doc.data().message,
                  media: doc.data().media,
                  file: doc.data().file,
                  fileName: doc.data().fileName,
                }));
              });

            return {
              id: doc.id,
              roomId: doc.data().roomId,
              timestamp: doc.data().timestamp,
              dateMessages,
            };
          });

          Promise.all(roomMessages)
            .then((result) => setRoomMessages(result))
            .catch((error) => console.error(error));
        });
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    getSelectedRoomMessages();
  }, [selectedRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages.length]);

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
    pb-8
  `}
`;

const BlockMessagesWrapper = styled.div`
  ${tw`
    flex-1
  `}
`;
