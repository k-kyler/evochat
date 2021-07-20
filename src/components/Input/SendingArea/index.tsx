import {
  FC,
  useRef,
  useState,
  useEffect,
  MouseEvent,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiMessageDetail, BiGhost, BiImages } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaIconRef = useRef<HTMLSpanElement>(null);
  const sendingAreaContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const textAreaFocusHandler = () => {
    // if (textAreaRef.current && textAreaIconRef.current) {
    //   textAreaIconRef.current.style.display = "none";
    //   textAreaRef.current.focus();
    // }
  };

  const textAreaBlurHandler = () => {
    // if (textAreaIconRef.current) {
    //   textAreaIconRef.current.style.display = "block";
    // }
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
      }
    }
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current)
      textAreaRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

  return (
    <>
      <SendingAreaContainer ref={sendingAreaContainerRef}>
        <TextAreaContainer>
          <Icon onClick={textAreaFocusHandler} ref={textAreaIconRef}>
            <BiMessageDetail />
          </Icon>

          <TextArea
            onChange={textAreaOnChangeHandler}
            onKeyDown={(event) => sendMessageHandler(event)}
            onFocus={textAreaFocusHandler}
            onBlur={textAreaBlurHandler}
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
    sticky
    bottom-6
    left-6
    right-6
    bg-gray-600
    p-3
    rounded-3xl
    opacity-80
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
      hover:text-blue-500
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
