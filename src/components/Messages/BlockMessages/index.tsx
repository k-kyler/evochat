import { forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BlockMessagesType } from "../../../typings/BlockMessagesType";
import Message from "../Message";
import LineAlert from "../LineAlert";

interface IBlockMessagesProps extends BlockMessagesType {}

const BlockMessages = forwardRef<any, IBlockMessagesProps>(
  ({ timestamp, dateMessages, selectedRoomTimestamp }, ref) => {
    const convertedTimestamp = new Date(timestamp?.toDate()).toDateString();

    return (
      <BlockMessagesContainer ref={ref}>
        {new Date(selectedRoomTimestamp.toDate()).toDateString() !==
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
  
  `}
`;
