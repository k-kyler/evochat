import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SharedMediaType } from "../../../../typings/Shared";

interface IMediaItemProps extends SharedMediaType {}

const MediaItem: FC<IMediaItemProps> = ({ media, type }) => {
  return (
    <MediaItemContainer>
      {type === "image" ? (
        <img loading="lazy" src={media} />
      ) : type === "video" ? (
        <video src={media} preload="metadata" controls></video>
      ) : null}
    </MediaItemContainer>
  );
};

export default MediaItem;

const MediaItemContainer = styled.div`
  ${tw`
    transition-all
    duration-300
    ease-in-out
    h-auto
    w-16
  `}

  img {
    ${tw`
      cursor-pointer
    `}
  }

  img,
  video {
    ${tw`
      w-full
      h-full
      rounded-md
    `}
  }

  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;
