import { FC, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Input from "../Input";
import Button from "../Button";
import { db } from "../../firebase";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";

interface IModalProps {
  title: string;
  description?: string;
  type: "create-room" | "search-room";
  open: boolean;
  closeHandler: () => void;
}

const Modal: FC<IModalProps> = ({
  title,
  description,
  type,
  open,
  closeHandler,
}) => {
  const inputTextRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const createNewRoomHandler = () => {
    if (inputTextRef.current?.value)
      db.collection("rooms").add({
        oid: user?.uid,
        name: inputTextRef.current?.value,
        members: [],
        background: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  if (!open) return null;
  return createPortal(
    <>
      <ModalOverlay onClick={closeHandler} />

      <ModalContent>
        <ModalHeader>
          <CloseModalButton onClick={closeHandler}>&times;</CloseModalButton>
        </ModalHeader>

        <ModalBody>
          <ModalTitle>{title}</ModalTitle>

          <ModalDescription>{description}</ModalDescription>

          <ModalFeature>
            {type === "create-room" ? (
              <CreateRoomContainer>
                <Input type="upload-image" refValue={inputImageRef} />
                <Input label="Room name" type="text" refValue={inputTextRef} />
                <ButtonsContainer>
                  <Button
                    content="Create"
                    theme="normal"
                    color="blue"
                    clickHandler={createNewRoomHandler}
                  />
                </ButtonsContainer>
              </CreateRoomContainer>
            ) : null}
          </ModalFeature>
        </ModalBody>
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
    p-4
    shadow-lg
    rounded-md
    w-2/5
    fixed
    top-1/2
    left-1/2
  `}

  z-index: 1;
  transform: translate(-50%, -50%);
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
    text-gray-400
    pointer-events-none
    select-none
  `}

  width: 24em;
`;

const ModalFeature = styled.div`
  ${tw`
    mt-3
    select-none
    w-full
  `}
`;

const CreateRoomContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}

  div:not(:last-child) {
    ${tw`
      my-2
    `}
  }

  div:last-child {
    ${tw`
      mt-2
    `}
  }
`;

const ButtonsContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-end
    w-full
  `}
`;
