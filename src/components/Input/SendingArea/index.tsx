import {
  FC,
  useRef,
  useState,
  useEffect,
  MouseEvent,
  KeyboardEvent,
} from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import {
  BiMessageDetail,
  BiGhost,
  BiImages,
  BiChevronRight,
  BiFile,
} from "react-icons/bi";
import Tooltip from "../../Tooltip";
import Modal from "../../Modal";
import Picker, { IEmojiData } from "emoji-picker-react";
import { MessageType } from "../../../typings/MessageType";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";

interface ISendingArea {
  roomId?: string;
}

const SendingArea: FC<ISendingArea> = ({ roomId }) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>();
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const sendingAreaContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const stretchOutTextAreaHandler = () => {
    setIsOpen(!isOpen);
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

  const sendMessageHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (user && textAreaRef.current && textAreaRef.current.value) {
        const messageObject: MessageType = {
          uid: user.uid,
          username: user.displayName as string,
          avatar: user.photoURL as string,
          message: textAreaRef.current.value,
          type: "text",
          timestamp: new Date(),
        };

        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add(messageObject);

        textAreaRef.current.value = "";
        textAreaRef.current.style.cssText = "height: auto";
      }
    }
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current)
      textAreaRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

  return (
    <>
      <SendingAreaContainer ref={sendingAreaContainerRef} isOpen={isOpen}>
        {isOpen ? (
          <>
            <Options ref={optionsRef}>
              <Icon isOpen={isOpen} onClick={() => setOpenEmojiModal(true)}>
                <BiGhost />
                <Tooltip content="Emoji" arrow="bottom" />
              </Icon>
              <Icon isOpen={isOpen}>
                <BiImages />
                <Tooltip content="Image & Video" arrow="bottom" />
              </Icon>
              <Icon isOpen={isOpen}>
                <BiFile />
                <Tooltip content="Attachment" arrow="bottom" />
              </Icon>
            </Options>

            <TextArea
              onChange={textAreaOnChangeHandler}
              onKeyDown={(event) => sendMessageHandler(event)}
              ref={textAreaRef}
              spellCheck="false"
              placeholder="Type a message..."
              autoFocus
              rows={1}
            />
          </>
        ) : null}

        <Icon onClick={stretchOutTextAreaHandler} isOpen={isOpen}>
          {isOpen ? <BiChevronRight /> : <BiMessageDetail />}
        </Icon>
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

const SendingAreaContainer = styled.div<{ isOpen?: boolean }>`
  ${tw`
    flex
    justify-between
    sticky
    bottom-6
    p-3
    rounded-3xl
    opacity-90
    ml-auto
  `}

  ${({ isOpen }) =>
    isOpen
      ? css`
          ${tw`
            bg-gray-600
          `}

          animation: stretchIn 0.2s ease-in-out forwards;

          @keyframes stretchIn {
            from {
              width: 50%;
            }
            to {
              width: 100%;
            }
          }
        `
      : css`
          animation: stretchOut 0.3s ease-in-out forwards;

          @keyframes stretchOut {
            to {
              ${tw`
                bg-white
              `}

              width: fit-content;
            }
          }
        `}
`;

const TextArea = styled.textarea`
  ${tw`
    w-full
    text-white
    mx-4
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
      hover:text-blue-500
    `}

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Icon = styled.span<{ isOpen?: boolean }>`
  ${tw`
    relative
    text-2xl
    cursor-pointer
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

  ${({ isOpen }) =>
    isOpen
      ? css`
          color: #9ca3af;
        `
      : css`
          color: #2c9984;
        `}
`;
