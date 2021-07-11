import { FC, useRef, useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiMessageDetail, BiGhost, BiImages } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";
import Tooltip from "../../Tooltip";
import Modal from "../../Modal";
import Picker, { IEmojiData } from "emoji-picker-react";
import { db } from "../../../firebase";
import firebase from "firebase";
import { useAuth } from "../../../contexts/AuthContext";

const SendingArea: FC = () => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>();
  const [openEmojiModal, setOpenEmojiModal] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textAreaFocusHandler = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const textAreaOnChangeHandler = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.cssText = "height: auto";
      textAreaRef.current.style.cssText =
        "height: " + textAreaRef.current.scrollHeight + "px";
    }
  };

  const chosenEmojiHandler = (
    event: MouseEvent<Element, globalThis.MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current)
      textAreaRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

  return (
    <>
      <SendingAreaContainer>
        <TextAreaContainer>
          <Icon onClick={textAreaFocusHandler}>
            <BiMessageDetail />
          </Icon>

          <TextArea
            onChange={textAreaOnChangeHandler}
            ref={textAreaRef}
            spellCheck="false"
            placeholder="Type a message..."
            rows={1}
          />
        </TextAreaContainer>

        <Options>
          <Icon onClick={() => setOpenEmojiModal(true)}>
            <BiGhost />
            <Tooltip content="Emoji" arrow="bottom" />
          </Icon>
          <Icon>
            <BiImages />
            <Tooltip content="Image & Video" arrow="bottom" />
          </Icon>
          <Icon>
            <RiFileGifLine />
            <Tooltip content="Giphy" arrow="bottom" />
          </Icon>
        </Options>
      </SendingAreaContainer>

      <Modal
        type="emoji"
        emojiPicker={
          <Picker
            onEmojiClick={chosenEmojiHandler}
            disableAutoFocus={true}
            native
            pickerStyle={{
              width: "100%",
              boxShadow: "none",
              borderTop: "none",
            }}
          />
        }
        open={openEmojiModal}
        closeHandler={() => setOpenEmojiModal(false)}
      />
    </>
  );
};

export default SendingArea;

const SendingAreaContainer = styled.div`
  ${tw`
    flex
    justify-between
    absolute
    bottom-6
    left-6
    right-6
    bg-gray-600
    p-3
    rounded-lg
  `}
`;

const TextAreaContainer = styled.div`
  ${tw`
    flex
    w-full
  `}
`;

const TextArea = styled.textarea`
  ${tw`
    w-full
    text-white
    mx-2
    bg-transparent
    outline-none
    resize-none
    overflow-hidden
  `}
`;

const Options = styled.div`
  ${tw`
    flex
  `}

  span {
    ${tw`
      cursor-pointer
      hover:opacity-80
    `}

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Icon = styled.span`
  ${tw`
    relative
    text-2xl
  `}

  color: #9ca3af;

  span {
    ${tw`
      text-sm
    `}

    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    span {
      ${tw`
        visible
        transition-all
        duration-300
        ease-in-out
        text-white
      `}
    }
  }
`;
