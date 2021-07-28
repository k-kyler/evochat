import { FC, useRef } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FaRegPlayCircle } from "react-icons/fa";
import { SharedMediaType } from "../../../../typings/SharedType";

interface IMediaItemProps extends SharedMediaType {}

const MediaItem: FC<IMediaItemProps> = ({ media, type }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoFullscreenHandler = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <>
      {type === "image" ? (
        <MediaItemContainer src={media} type={type} />
      ) : type === "video" ? (
        <MediaItemContainer type={type}>
          <video src={media} ref={videoRef}></video>

          <VideoOverlay onClick={videoFullscreenHandler}>
            <Icon>
              <FaRegPlayCircle />
            </Icon>
          </VideoOverlay>
        </MediaItemContainer>
      ) : null}
    </>
  );
};

export default MediaItem;

const MediaItemContainer = styled.div<{
  src?: string;
  type: "image" | "video";
}>`
  ${tw`
    transition-all
    duration-300
    ease-in-out
    h-16
    w-16
    cursor-pointer
    rounded-md
  `}

  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  ${({ src, type }) =>
    type === "image"
      ? css`
          ${tw`
            bg-cover
            bg-center
            bg-no-repeat
          `}

          background-image: url(${src});
        `
      : type === "video"
      ? css`
          ${tw`
            relative
          `}

          video {
            ${tw`
              rounded-md
            `}
          }
        `
      : null}
`;

const VideoOverlay = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    bottom-0
    right-0
    rounded-md
  `}

  background: rgba(0, 0, 0, 0.6);
`;

const Icon = styled.span`
  ${tw`
    text-3xl
    text-white
    cursor-pointer
    absolute
    top-1/2
    left-1/2
  `}

  transform: translate(-50%, -50%);
`;
