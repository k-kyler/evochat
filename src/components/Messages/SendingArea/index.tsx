import { FC, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiMessageDetail } from "react-icons/bi";
import { db } from "../../../firebase";
import firebase from "firebase";
import { useAuth } from "../../../contexts/AuthContext";

const SendingArea: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputFocusHandler = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <SendingAreaContainer>
      <InputContainer>
        <InputIcon onClick={inputFocusHandler}>
          <BiMessageDetail />
        </InputIcon>

        <Input ref={inputRef} placeholder="Type a message..." />
      </InputContainer>

      <Options></Options>
    </SendingAreaContainer>
  );
};

export default SendingArea;

const SendingAreaContainer = styled.div`
  ${tw`
    flex
    items-center
    absolute
    bottom-6
    left-6
    right-6
    bg-gray-600
    p-3
    rounded-lg
  `}
`;

const InputContainer = styled.div`
  ${tw`
    flex
    items-center
    w-full
  `}
`;

const Input = styled.input`
  ${tw`
    w-full
    text-white
    ml-2
    bg-transparent
    outline-none
  `}
`;

const Options = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const InputIcon = styled.span`
  ${tw`
    text-2xl
  `}

  color: #9ca3af;
`;
