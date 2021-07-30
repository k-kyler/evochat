import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BlockMessagesType } from "../../../typings/BlockMessagesType";
import { MessageType } from "../../../typings/MessageType";
import Message from "../Message";
import LineAlert from "../LineAlert";
import { db } from "../../../firebase";

interface IBlockMessagesProps extends BlockMessagesType {
  scrollToBottom: () => void;
}

const BlockMessages = forwardRef<any, IBlockMessagesProps>(
  ({ timestamp, id, selectedRoomTimestamp, scrollToBottom }, ref) => {
    const [dateMessages, setDateMessages] = useState<MessageType[]>([]);

    const convertedTimestamp =
      new Date(timestamp?.toDate()).toDateString() +
      ", " +
      new Date(timestamp?.toDate()).toLocaleTimeString();

    const getDateMessages = () => {
      db.collection("roomMessages")
        .doc(id)
        .collection("dateMessages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
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

          setDateMessages(messages);
        });
    };

    useEffect(() => {
      getDateMessages();
    }, []);

    useEffect(() => {
      scrollToBottom();
    }, [dateMessages.length]);

    return (
      <BlockMessagesContainer ref={ref}>
        {new Date(selectedRoomTimestamp?.toDate()).toDateString() +
          ", " +
          new Date(timestamp?.toDate()).toLocaleTimeString() !==
        convertedTimestamp ? (
          <LineAlert content={convertedTimestamp} />
        ) : null}

        {dateMessages.map((dateMessage) => (
          <Message key={dateMessage.id} {...dateMessage} />
        ))}
      </BlockMessagesContainer>
    );
  }
);

export default BlockMessages;

const BlockMessagesContainer = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;
