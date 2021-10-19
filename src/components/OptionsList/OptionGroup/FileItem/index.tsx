import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SharedFileType } from "../../../../typings/SharedType";
import DocumentImage from "../../../../assets/document.svg";
import SheetImage from "../../../../assets/sheet.svg";
import PDFImage from "../../../../assets/pdf.svg";
import ArchiveImage from "../../../../assets/archive.svg";
import TxtImage from "../../../../assets/txt.svg";

interface IFileItemProps extends SharedFileType {}

const FileItem: FC<IFileItemProps> = ({ fileName, file }) => {
  if (file && fileName)
    return (
      <a href={file} download target="__blank">
        <FileItemContainer title={fileName}>
          <ImageTypeContainer>
            {["doc", "docx"].includes(
              fileName.split(".")[fileName.split(".").length - 1]
            ) ? (
              <img loading="lazy" src={DocumentImage} />
            ) : ["xls", "xlsx"].includes(
                fileName.split(".")[fileName.split(".").length - 1]
              ) ? (
              <img loading="lazy" src={SheetImage} />
            ) : ["rar", "zip"].includes(
                fileName.split(".")[fileName.split(".").length - 1]
              ) ? (
              <img loading="lazy" src={ArchiveImage} />
            ) : ["pdf"].includes(
                fileName.split(".")[fileName.split(".").length - 1]
              ) ? (
              <img loading="lazy" src={PDFImage} />
            ) : ["txt"].includes(
                fileName.split(".")[fileName.split(".").length - 1]
              ) ? (
              <img loading="lazy" src={TxtImage} />
            ) : null}
          </ImageTypeContainer>

          <FileName>{fileName}</FileName>
        </FileItemContainer>
      </a>
    );
  return null;
};

export default FileItem;

const FileItemContainer = styled.div`
  ${tw`
    flex
    items-center
    transition-all
    duration-300
    ease-in-out
    py-2
  `}

  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ImageTypeContainer = styled.div`
  ${tw`
    h-5
    w-auto
  `}

  img {
    ${tw`
      w-full
      h-full
    `}
  }
`;

const FileName = styled.p`
  ${tw`
    text-white
    ml-2
    text-sm
    overflow-ellipsis
    whitespace-nowrap
    overflow-x-hidden
    underline
  `}

  max-width: 15em;
`;
