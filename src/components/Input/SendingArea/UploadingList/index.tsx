import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import {
  SharedMediaType,
  SharedFileType,
} from "../../../../typings/SharedType";
import MediaItem from "../../../OptionsList/OptionGroup/MediaItem";
import FileItem from "../../../OptionsList/OptionGroup/FileItem";

interface IUploadingListProps {
  uploadingMediaList?: SharedMediaType[];
  uploadingFile?: SharedFileType;
}

const UploadingList: FC<IUploadingListProps> = ({
  uploadingMediaList,
  uploadingFile,
}) => {
  return (
    <UploadingListContainer>
      <UploadingMediaContainer>
        {uploadingMediaList?.map((object, index) => (
          <MediaItem key={index} {...object} />
        ))}
      </UploadingMediaContainer>

      <UploadingFileContainer>
        {uploadingFile?.file && <FileItem {...uploadingFile} />}
      </UploadingFileContainer>

      <UploadingListOptions>
        <Icon type="upload">
          <FaCheckCircle />
        </Icon>
        <Icon type="clear">
          <FaBan />
        </Icon>
      </UploadingListOptions>
    </UploadingListContainer>
  );
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
    p-2
  `}

  &::after {
    ${tw`
      absolute
      top-full
    `}

    left: 45%;
    content: "";
    border-width: 7px;
    border-style: solid;
    border-color: rgba(75, 85, 99) transparent transparent rgba(75, 85, 99);
  }
`;

const UploadingMediaContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  div {
    ${tw`
      h-12
      w-12
    `}

    &:not(:last-child) {
      ${tw`
        mr-4
      `}
    }
  }
`;

const UploadingFileContainer = styled.div`
  a {
    div {
      ${tw`
        w-max
      `}

      p {
        ${tw`
          ml-1
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

const Icon = styled.div<{ type: "upload" | "clear" }>`
  ${tw`
    text-xl
    cursor-pointer
    ml-3
    grid
    place-items-center
  `}

  ${({ type }) => (type === "upload" ? tw`text-green-500` : tw`text-red-500`)}
`;
