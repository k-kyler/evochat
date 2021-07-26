import { useRef, useState, forwardRef } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Emoji from "react-emoji-render";
import {
  FaRegPlayCircle,
  FaPause,
  FaVolumeDown,
  FaVolumeMute,
  FaExpand,
  FaPlay,
} from "react-icons/fa";
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
      media,
      file,
      fileName,
      timestamp,
      active,
      type,
    },
    ref
  ) => {
    const [showMessageTimestamp, setShowMessageTimestamp] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    const messageTimestampRef = useRef<HTMLSpanElement>(null);
    const messageContentRef = useRef<HTMLParagraphElement>(null);
    const videoControllerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoProgressRef = useRef<HTMLDivElement>(null);

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

    const playVideoHandler = () => {
      setIsVideoPlaying(true);

      if (videoRef.current && videoControllerRef.current) {
        videoControllerRef.current.style.transform = "translateY(0)";
        videoControllerRef.current.style.transition = "all 0.3s ease-in-out";
        videoRef.current.play();
        videoDurationHandler();
      }
    };

    const pauseVideoHandler = () => {
      setIsVideoPlaying(false);

      if (videoRef.current && videoControllerRef.current) {
        videoControllerRef.current.style.transform = "translateY(100%)";
        videoControllerRef.current.style.transition = "all 0.3s ease-in-out";
        videoRef.current.pause();
      }
    };

    const videoFullscreenHandler = () => {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
      }
    };

    const videoMutedHandler = () => {
      setIsVideoMuted(!isVideoMuted);

      if (videoRef.current) {
        videoRef.current.muted = isVideoMuted;
      }
    };

    const videoDurationHandler = () => {
      if (videoRef.current) {
        videoRef.current.addEventListener("timeupdate", () => {
          if (videoRef.current && videoProgressRef.current) {
            let progress =
              videoRef.current.currentTime / videoRef.current.duration;

            videoProgressRef.current.style.width = progress * 100 + "%";

            if (videoRef.current.ended && videoControllerRef.current) {
              setIsVideoPlaying(false);

              videoControllerRef.current.style.transform = "translateY(100%)";
              videoControllerRef.current.style.transition =
                "all 0.3s ease-in-out";
            }
          }
        });
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
              <img loading="lazy" src={media} />
            </ImageContent>
          ) : type === "video" ? (
            <VideoContent>
              <video src={media} ref={videoRef}></video>

              {!isVideoPlaying ? (
                <VideoOverlay onClick={playVideoHandler}>
                  <LargeIcon>
                    <FaRegPlayCircle />
                  </LargeIcon>
                </VideoOverlay>
              ) : null}

              <VideoController ref={videoControllerRef}>
                <VideoButtons>
                  <SmallIcon onClick={pauseVideoHandler}>
                    <FaPause />
                  </SmallIcon>

                  <VideoProgress>
                    <div ref={videoProgressRef}></div>
                  </VideoProgress>

                  <SmallIcon onClick={videoMutedHandler}>
                    {!isVideoMuted ? <FaVolumeDown /> : <FaVolumeMute />}
                  </SmallIcon>

                  <SmallIcon onClick={videoFullscreenHandler}>
                    <FaExpand />
                  </SmallIcon>
                </VideoButtons>
              </VideoController>
            </VideoContent>
          ) : type === "file" ? (
            <MessageContent>
              <a href={file} download target="__blank">
                {fileName}
              </a>
            </MessageContent>
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
    max-w-sm
    bg-white
    cursor-pointer
    break-words
  `}

  width: fit-content;

  a {
    ${tw`
      underline
    `}
  }
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
    max-w-sm
    w-full
    h-auto
  `}

  img {
    ${tw`
      rounded-xl
      w-full
      h-full
    `}
  }
`;

const VideoContent = styled.div`
  ${tw`
    max-w-sm
    w-full
    relative
    overflow-hidden
  `}

  video {
    ${tw`
      rounded-xl
    `}
  }
`;

const VideoController = styled.div`
  ${tw`
    flex
    flex-wrap
    absolute
    bottom-0
    w-full
    rounded-b-xl
  `}

  transform: translateY(100%);
  background: rgba(0, 0, 0, 0.6);
`;

const VideoProgress = styled.div`
  ${tw`
    mr-3
    w-full
    h-1
    flex-1
    bg-gray-500
  `}

  div {
    ${tw`
      bg-white
      h-1
    `}
  }
`;

const VideoButtons = styled.div`
  ${tw`
    flex
    items-center
    w-full
    p-2
  `}

  span:last-child {
    margin-right: 0;
  }
`;

const SmallIcon = styled.span`
  ${tw`
    text-lg
    text-white
    cursor-pointer
    mr-3
  `}
`;

const VideoOverlay = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    bottom-0
    right-0
    rounded-xl
    cursor-pointer
  `}

  background: rgba(0, 0, 0, 0.6);
`;

const LargeIcon = styled.span`
  ${tw`
    text-7xl
    text-white
    cursor-pointer
    absolute
    top-1/2
    left-1/2
  `}

  transform: translate(-50%, -50%);
`;
