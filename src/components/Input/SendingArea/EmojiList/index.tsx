import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IEmojiListProps {
  emojiPicker?: any;
  open: boolean;
}

const EmojiList: FC<IEmojiListProps> = ({ emojiPicker, open }) => {
  if (!open) return null;
  return <EmojiListContainer>{emojiPicker}</EmojiListContainer>;
};

export default EmojiList;

const EmojiListContainer = styled.div`
  ${tw`
    absolute
    bottom-14
    bg-white
    rounded-xl
    w-96
    p-1
  `}

  &::after {
    ${tw`
      absolute
      top-full
      left-4
    `}

    content: "";
    border-width: 5px;
    border-style: solid;
    border-color: rgb(255, 255, 255) transparent transparent rgb(255, 255, 255);
  }

  z-index: 1;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Overlay = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    right-0
    bottom-0
  `}

  z-index: 1;
`;
