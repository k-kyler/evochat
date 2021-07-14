import { FC, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Input from "../Input";
import Button from "../Button";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";

interface IModalProps {
  title?: string;
  description?: string;
  emojiPicker?: any;
  type:
    | "create-room"
    | "search-room"
    | "user-setting"
    | "room-panel"
    | "image-video"
    | "giphy"
    | "emoji";
  open: boolean;
  closeHandler: () => void;
}

const Modal: FC<IModalProps> = ({
  title,
  description,
  emojiPicker,
  type,
  open,
  closeHandler,
}) => {
  const inputRoomNameRef = useRef<HTMLInputElement>(null);
  const inputRoomBackgroundRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const createNewRoomHandler = () => {
    if (inputRoomNameRef.current && inputRoomBackgroundRef.current) {
      const roomName = inputRoomNameRef.current.value;
      const roomBackground = inputRoomBackgroundRef.current.files;

      // Add new room document to rooms collection handler
      db.collection("rooms")
        .add({
          oid: user?.uid,
          name: roomName,
          background: "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
          // Upload room background handler
          const storageRef = storage.ref();
          const roomBackgroundRef = storageRef.child(
            `room-background/${docRef.id}/${roomBackground}`
          );

          // roomBackgroundRef.put(roomBackground[0] as any);
        })
        .catch((error) => console.error(error));

      // Close create new room modal
      closeHandler();
    }
  };

  const switchToSearchRoomModal = () => {};

  if (!open) return null;
  return createPortal(
    <>
      <ModalOverlay onClick={closeHandler} />

      <ModalContent>
        <ModalInnerContent isEmoji={type}>
          {type !== "emoji" && (
            <ModalHeader>
              <CloseModalButton onClick={closeHandler}>
                &times;
              </CloseModalButton>
            </ModalHeader>
          )}

          <ModalBody>
            <ModalTitle>{title}</ModalTitle>

            <ModalDescription>{description}</ModalDescription>

            <ModalFeature isEmoji={type}>
              {type === "create-room" ? (
                <CreateRoomFeature>
                  <Input
                    type="create-room-upload-image"
                    refValue={inputRoomBackgroundRef}
                  />
                  <Input
                    label="Room name"
                    type="create-room-text"
                    refValue={inputRoomNameRef}
                  />
                </CreateRoomFeature>
              ) : type === "emoji" ? (
                emojiPicker
              ) : null}
            </ModalFeature>
          </ModalBody>
        </ModalInnerContent>

        {type !== "emoji" && (
          <ModalActions>
            {type === "create-room" ? (
              <CreateRoomButtons>
                <Button
                  content="Search room"
                  theme="text-icon"
                  color="dark"
                  icon={<FaSearch />}
                />
                <Button
                  content="Create"
                  theme="filled-no-outlined"
                  color="blue"
                  clickHandler={createNewRoomHandler}
                />
              </CreateRoomButtons>
            ) : null}
          </ModalActions>
        )}
      </ModalContent>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;

const ModalOverlay = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    right-0
    bottom-0
  `}

  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  ${tw`
    bg-white
    shadow-lg
    rounded-md
    w-2/5
    fixed
    top-1/2
    left-1/2
  `}

  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ModalInnerContent = styled.div<{ isEmoji?: string }>`
  ${({ isEmoji }) => isEmoji !== "emoji" && tw`p-4`}
`;

const ModalHeader = styled.div`
  ${tw`
    flex
    items-center
    justify-end
  `}
`;

const CloseModalButton = styled.span`
  ${tw`
    pt-4
    cursor-pointer
    text-3xl
    text-gray-400
    transition-all
    duration-300
    ease-in-out
    absolute
    hover:text-gray-700
  `}
`;

const ModalBody = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const ModalTitle = styled.h3`
  ${tw`
    text-center
    text-2xl
    capitalize    
    mt-1
    mb-2
    select-none
    pointer-events-none
  `}
`;

const ModalDescription = styled.p`
  ${tw`
    text-center
    text-sm
    text-gray-500
    pointer-events-none
    select-none
  `}

  width: 26em;
`;

const ModalFeature = styled.div<{ isEmoji?: string }>`
  ${tw`
    select-none
    w-full
  `}

  ${({ isEmoji }) => isEmoji !== "emoji" && tw`mt-3`}
`;

const ModalActions = styled.div`
  ${tw`
    bg-gray-100
    px-4
    py-3
  `}

  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const CreateRoomFeature = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}

  div {
    ${tw`
      my-2
    `}
  }
`;

const CreateRoomButtons = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    w-full
  `}
`;
