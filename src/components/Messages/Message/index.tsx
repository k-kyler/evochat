import { FC, useRef, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useAuth } from "../../../contexts/AuthContext";
import { MessageType } from "../../../typings/MessageType";
import OnlineStatus from "../../OnlineStatus";

interface IMessageProps extends MessageType {}

const Message: FC<IMessageProps> = ({
  uid,
  message,
  avatar,
  username,
  timestamp,
  active,
  type,
}) => {
  const [showMessageTimestamp, setShowMessageTimestamp] = useState(false);

  const messageTimestampRef = useRef<HTMLSpanElement>(null);
  const messageContentRef = useRef<HTMLParagraphElement>(null);

  const { user } = useAuth();

  const showMessageTimestampHandler = () => {
    if (messageTimestampRef.current && messageContentRef.current) {
      setShowMessageTimestamp(!showMessageTimestamp);

      messageTimestampRef.current.style.display = `${
        showMessageTimestamp ? "block" : "none"
      }`;
      messageContentRef.current.style.opacity = `${
        showMessageTimestamp ? "0.9" : "1"
      }`;
      messageContentRef.current.style.transition = "all 0.3s ease-in-out";
    }
  };

  if (type === "text")
    return (
      <MessageContainer isUser={uid === user?.uid ? true : false}>
        <AvatarContainer>
          <img src={avatar} />
          {active && <OnlineStatus effect="none" />}
        </AvatarContainer>

        <MessageInfo>
          <SenderName>{username}</SenderName>
          <MessageContent
            ref={messageContentRef}
            onClick={showMessageTimestampHandler}
          >
            {message}
          </MessageContent>
          <MessageTimestamp ref={messageTimestampRef}>
            {timestamp}
          </MessageTimestamp>
        </MessageInfo>
      </MessageContainer>
    );
  return null;
};

export default Message;

const MessageContainer = styled.div<{ isUser?: boolean }>`
  ${tw`
    flex
    items-end
    my-3
  `}

  ${({ isUser }) =>
    isUser &&
    css`
      ${tw`justify-end`}

      div:nth-child(1), span:nth-child(1) {
        display: none;
      }

      p {
        ${tw`text-white`}
        background-color: #2c9984;
      }
    `}
`;

const AvatarContainer = styled.div`
  ${tw`
    relative
    mr-2  
  `}

  img {
    ${tw`
      h-8
      w-8
      rounded-full
    `}
  }
`;

const MessageInfo = styled.div`
  ${tw`
    flex
    flex-col
    relative
  `}
`;

const SenderName = styled.span`
  ${tw`
    text-gray-400
    text-xs
    mb-2
    max-w-xs
  `}
`;

const MessageContent = styled.p`
  ${tw`
    text-black
    p-2
    rounded-lg
    max-w-md
    bg-white
    cursor-pointer
    select-none
  `}

  width: fit-content;
`;

const MessageTimestamp = styled.span`
  ${tw`
    text-xs
    text-gray-400
    mt-2
    absolute
    top-full
  `}

  display: none;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;
