import { FC, useRef, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FaRegPlayCircle } from "react-icons/fa";
import { SharedMediaType } from "../../../../typings/SharedType";
import Modal from "../../../Modal";

interface IMediaItemProps extends SharedMediaType {}

const MediaItem: FC<IMediaItemProps> = ({ media, type }) => {
  const [openZoomImageModal, setOpenZoomImageModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoFullscreenHandler = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  if (media && type)
    return (
      <>
        {type === "image" ? (
          <>
            <MediaItemContainer
              src={media}
              type={type}
              onClick={() => setOpenZoomImageModal(true)}
            />

            <Modal
              type="zoom-image"
              imageSrc={media}
              open={openZoomImageModal}
              closeHandler={() => setOpenZoomImageModal(false)}
            />
          </>
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
  return null;
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
    cursor-pointer
    rounded-md
  `}

  height: 4.8rem;
  width: 4.8rem;
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
