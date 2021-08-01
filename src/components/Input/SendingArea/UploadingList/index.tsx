import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaCheck, FaTimes } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {
  SharedMediaType,
  SharedFileType,
} from "../../../../typings/SharedType";
import MediaItem from "../../../OptionsList/OptionGroup/MediaItem";
import FileItem from "../../../OptionsList/OptionGroup/FileItem";

interface IUploadingListProps {
  uploadingMedia?: SharedMediaType;
  uploadingFile?: SharedFileType;
  uploadLoading: boolean;
  uploadHandler: () => void;
  clearUploadingListHandler: () => void;
  checkUploadProcess: boolean;
}

const UploadingList: FC<IUploadingListProps> = ({
  uploadingMedia,
  uploadingFile,
  uploadLoading,
  uploadHandler,
  clearUploadingListHandler,
  checkUploadProcess,
}) => {
  if (uploadingMedia?.media || uploadingFile?.file)
    return (
      <UploadingListContainer>
        <UploadingObjectsContainer>
          {uploadingMedia?.media ? (
            <UploadingMediaContainer>
              <MediaItem {...uploadingMedia} />
            </UploadingMediaContainer>
          ) : null}

          {uploadingFile?.fileName ? (
            <UploadingFileContainer>
              <FileItem {...uploadingFile} />
            </UploadingFileContainer>
          ) : null}
        </UploadingObjectsContainer>

        <UploadingListOptions>
          <Icon
            type="upload"
            uploadLoading={uploadLoading}
            checkUploadProcess={checkUploadProcess}
            onClick={
              !uploadLoading && !checkUploadProcess ? uploadHandler : () => {}
            }
          >
            {uploadLoading ? (
              <CgSpinner />
            ) : checkUploadProcess ? null : (
              <FaCheck />
            )}
          </Icon>

          {!uploadLoading ? (
            <Icon type="clear" onClick={clearUploadingListHandler}>
              <FaTimes />
            </Icon>
          ) : null}
        </UploadingListOptions>
      </UploadingListContainer>
    );
  return null;
};

export default UploadingList;

const UploadingListContainer = styled.div<{ src?: string }>`
  ${tw`
    absolute
    flex
    items-center
    bottom-14
    bg-gray-600
    rounded-xl
    p-1
  `}

  &::after {
    ${tw`
      absolute
      top-full
      left-16
    `}

    content: "";
    border-width: 5px;
    border-style: solid;
    border-color: rgba(75, 85, 99) transparent transparent rgba(75, 85, 99);
  }
`;

const UploadingObjectsContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const UploadingMediaContainer = styled.div`
  ${tw`
    flex
    items-center
    m-1
  `}

  div {
    ${tw`
      h-12
      w-12
    `}
  }
`;

const UploadingFileContainer = styled.div`
  ${tw`
    m-1
  `}

  a {
    div {
      ${tw`
        w-max
      `}

      p {
        ${tw`
          ml-1
          max-w-xs
        `}
      }
    }
  }
`;

const UploadingListOptions = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.div<{
  type: "upload" | "clear";
  uploadLoading?: boolean;
  checkUploadProcess?: boolean;
}>`
  ${tw`
    text-xl
  `}

  ${({ type }) => (type === "upload" ? tw`text-green-500` : tw`text-red-500`)}

  ${({ uploadLoading }) =>
    uploadLoading
      ? tw`
    animate-spin
  `
      : tw`
    cursor-pointer
  `}

  ${({ checkUploadProcess }) =>
    !checkUploadProcess &&
    tw`
      m-2
    `}
`;
