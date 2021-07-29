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
}

const UploadingList: FC<IUploadingListProps> = ({
  uploadingMedia,
  uploadingFile,
  uploadLoading,
  uploadHandler,
  clearUploadingListHandler,
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
            onClick={uploadHandler}
            title="Upload"
          >
            {uploadLoading ? <CgSpinner /> : <FaCheck />}
          </Icon>
          <Icon type="clear" onClick={clearUploadingListHandler} title="Clear">
            <FaTimes />
          </Icon>
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
    px-3
    py-2
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
    mr-3
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
    mr-3
  `}

  a {
    div {
      ${tw`
        w-max
      `}

      p {
        ${tw`
          ml-1
          max-w-max
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

  div {
    &:not(:last-child) {
      ${tw`
        mr-3
      `}
    }
  }
`;

const Icon = styled.div<{ type: "upload" | "clear"; uploadLoading?: boolean }>`
  ${tw`
    text-xl
    cursor-pointer
  `}

  ${({ type }) => (type === "upload" ? tw`text-green-500` : tw`text-red-500`)}

  ${({ uploadLoading }) => uploadLoading && tw`animate-spin`}
`;
