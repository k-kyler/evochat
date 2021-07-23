import { useRef, useState, forwardRef } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Emoji from "react-emoji-render";
import PreloadImage from "react-preload-image";
import { useAuth } from "../../../contexts/AuthContext";
import { MessageType } from "../../../typings/MessageType";
import OnlineStatus from "../../OnlineStatus";

interface IMessageProps extends MessageType {}

const Message = forwardRef<any, IMessageProps>(
  (
    {
      uid,
      avatar,
      username,
      message,
      image,
      video,
      file,
      timestamp,
      active,
      type,
    },
    ref
  ) => {
    const [showMessageTimestamp, setShowMessageTimestamp] = useState(true);

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
          showMessageTimestamp ? "0.8" : "1"
        }`;
        messageContentRef.current.style.transition = "all 0.3s ease-in-out";
      }
    };

    return (
      <MessageContainer
        ref={ref}
        isUser={uid === user?.uid ? true : false}
        showMessageTimestamp={showMessageTimestamp}
      >
        <AvatarContainer isUser={uid === user?.uid ? true : false}>
          <img src={avatar} />
          {active && <OnlineStatus effect="none" />}
        </AvatarContainer>

        <MessageInfo>
          <SenderName isUser={uid === user?.uid ? true : false}>
            {username}
          </SenderName>

          {type === "text" ? (
            <MessageContent
              ref={messageContentRef}
              onClick={showMessageTimestampHandler}
            >
              <Emoji text={message} />
            </MessageContent>
          ) : type === "image" ? (
            <ImageContent>
              <PreloadImage src={image} lazy />
            </ImageContent>
          ) : type === "video" ? (
            <VideoContent url={video}>
              <video src={video} controls preload="metadata"></video>
            </VideoContent>
          ) : null}

          <MessageTimestamp ref={messageTimestampRef}>
            {new Date(timestamp.toDate()).toDateString() +
              ", " +
              new Date(timestamp.toDate()).toLocaleTimeString()}
          </MessageTimestamp>
        </MessageInfo>
      </MessageContainer>
    );
  }
);

export default Message;

const MessageContainer = styled.div<{
  isUser?: boolean;
  showMessageTimestamp?: boolean;
}>`
  ${tw`
    flex
    items-end
    my-5
  `}

  ${({ isUser }) =>
    isUser &&
    css`
      ${tw`justify-end`}

      div:nth-child(2) {
        ${tw`items-end`}
      }

      p {
        ${tw`text-white`}
        background-color: #2c9984;
      }
    `}

  ${({ showMessageTimestamp }) => !showMessageTimestamp && tw`mb-8`}
`;

const AvatarContainer = styled.div<{ isUser?: boolean }>`
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

  ${({ isUser }) =>
    isUser &&
    css`
      display: none;
    `}
`;

const MessageInfo = styled.div`
  ${tw`
    flex
    flex-col
    relative
  `}
`;

const SenderName = styled.span<{ isUser?: boolean }>`
  ${tw`
    text-gray-400
    text-xs
    mb-1
    max-w-xs
  `}

  ${({ isUser }) =>
    isUser &&
    css`
      display: none;
    `}
`;

const MessageContent = styled.p`
  ${tw`
    text-black
    p-2
    rounded-xl
    max-w-md
    bg-white
    cursor-pointer
    break-words
  `}

  width: fit-content;
`;

const MessageTimestamp = styled.span`
  ${tw`
    text-xs
    text-gray-400
    mt-1
    absolute
    top-full
  `}

  width: max-content;
  display: none;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ImageContent = styled.div`
  ${tw`
    cursor-pointer
    h-64
    relative
  `}

  width: 28rem;

  div {
    ${tw`rounded-xl`}
  }
`;

const VideoContent = styled.div<{ url?: string }>`
  ${tw`
    h-auto
  `}

  width: 28rem;

  video {
    ${tw`rounded-xl`}
  }
`;
