import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IModalProps {
  title: string;
  theme: "white" | "dark";
  type: "new-room" | "search-room";
}

const Modal: FC = () => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <CloseModalButton>&times;</CloseModalButton>
        </ModalHeader>

        <ModalBody>
          <ModalTitle>Create new room</ModalTitle>
          <ModalDescription>
            Gives your room a nice name and background, you can still change it
            later if you want
          </ModalDescription>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    h-full
    w-full
    overflow-auto
    grid
    place-items-center
  `}

  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  ${tw`
    bg-white
    p-4
    shadow-lg
    rounded
    relative
    w-2/5
`}
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
    hover:text-gray-600
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
    text-xl
    font-semibold
    mt-1
    mb-2
    select-none
    pointer-events-none
  `}
`;

const ModalDescription = styled.p`
  ${tw`
    text-center
    text-base
    text-gray-400
    mb-2
    pointer-events-none
    select-none
  `}

  width: 24em;
`;
