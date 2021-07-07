import { FC, RefObject } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiImage } from "react-icons/bi";
import Tooltip from "../Tooltip";
import { useAuth } from "../../contexts/AuthContext";

interface IInputProps {
  label?: string;
  placeholder?: string;
  type: "text" | "upload-image";
  refValue: RefObject<HTMLInputElement>;
}

const Input: FC<IInputProps> = ({ label, placeholder, type, refValue }) => {
  const { user } = useAuth();

  const inputTextFocusHandler = () => {
    if (refValue.current) refValue.current.focus();
  };

  const showHiddenInputHandler = () => {
    if (refValue.current) refValue.current.click();
  };

  return (
    <>
      {type === "text" ? (
        <InputTextContainer>
          <InputLabel onClick={inputTextFocusHandler}>{label}</InputLabel>
          <InputText
            ref={refValue}
            placeholder={placeholder}
            spellCheck="false"
            autoFocus
            defaultValue={`${user?.displayName}'s room`}
          />
        </InputTextContainer>
      ) : type === "upload-image" ? (
        <UploadImageContainer>
          <UploadImageIcon onClick={showHiddenInputHandler}>
            <BiImage />
            <Tooltip content="Upload image" arrow="left" />
          </UploadImageIcon>

          <input type="file" accept="image/*" ref={refValue} />
        </UploadImageContainer>
      ) : null}
    </>
  );
};

export default Input;

const InputTextContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
  `}
`;

const InputLabel = styled.label`
  ${tw`
    uppercase
    text-sm
    text-gray-500
    mb-1
  `}
`;

const InputText = styled.input`
  ${tw`
    text-sm
    text-black
    h-9
    p-2
    rounded-md
    outline-none
    transition-all
    duration-300
    ease-in-out
    border-2
    border-gray-300
    focus:border-blue-500
  `}
`;

const UploadImageContainer = styled.div`
  ${tw`
    p-3
    rounded-full
    border-solid
    border
    border-gray-300
  `}

  input {
    display: none;
  }
`;

const UploadImageIcon = styled.span`
  ${tw`
    text-3xl
    text-gray-800
    cursor-pointer
    flex
    items-center
    relative
  `}

  span {
    left: 180%;
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
