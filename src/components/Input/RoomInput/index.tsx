import { FC, RefObject, ChangeEvent, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiImage } from "react-icons/bi";
import Tooltip from "../../Tooltip";
import { useAuth } from "../../../contexts/AuthContext";

interface IRoomInputProps {
  label?: string;
  placeholder?: string;
  type: "room-text-label" | "room-upload-background" | "room-text";
  refValue: RefObject<HTMLInputElement>;
  setInputRoomBackground?: any;
  checkUploadBackground?: boolean;
  setCheckUploadBackground?: any;
  defaultValue?: string;
}

const RoomInput: FC<IRoomInputProps> = ({
  label,
  placeholder,
  type,
  refValue,
  setInputRoomBackground,
  checkUploadBackground,
  setCheckUploadBackground,
  defaultValue,
}) => {
  const [roomBackgroundPreview, setRoomBackgroundPreview] = useState<
    string | ArrayBuffer | null
  >(null);

  const { user } = useAuth();

  const inputTextFocusHandler = () => {
    if (refValue.current) refValue.current.focus();
  };

  const showHiddenInputHandler = () => {
    if (refValue.current) refValue.current.click();
  };

  const inputRoomBackgroundHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInputRoomBackground(event.target.files[0]);
      setRoomBackgroundPreview(URL.createObjectURL(event.target.files[0]));
      setCheckUploadBackground(false);
    }
  };

  return (
    <>
      {type === "room-text-label" ? (
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
      ) : type === "room-text" ? (
        <InputTextContainer>
          <InputText
            ref={refValue}
            placeholder={placeholder}
            spellCheck="false"
            autoFocus
            defaultValue={defaultValue}
          />
        </InputTextContainer>
      ) : type === "room-upload-background" ? (
        <>
          {roomBackgroundPreview ? (
            <PreviewRoomBackground
              background={roomBackgroundPreview}
              onClick={showHiddenInputHandler}
            >
              <Tooltip
                content={
                  checkUploadBackground
                    ? "Background is over 10 MB"
                    : "Click to change"
                }
                arrow="left"
                errorStyle={checkUploadBackground}
              />

              <input
                type="file"
                accept="image/*"
                ref={refValue}
                onChange={inputRoomBackgroundHandler}
              />
            </PreviewRoomBackground>
          ) : (
            <UploadImageContainer>
              <UploadImageIcon onClick={showHiddenInputHandler}>
                <BiImage />
                <Tooltip content="Upload image" arrow="left" />
              </UploadImageIcon>

              <input
                type="file"
                accept="image/*"
                ref={refValue}
                onChange={inputRoomBackgroundHandler}
              />
            </UploadImageContainer>
          )}
        </>
      ) : null}
    </>
  );
};

export default RoomInput;

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
    border-solid
    border
    border-gray-300
  `}

  border-radius: 50%;

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

const PreviewRoomBackground = styled.div<{ background: any }>`
  ${tw`
    w-20
    h-20
    bg-cover
    bg-center
    bg-no-repeat
    relative
    flex
    items-center
    cursor-pointer
    border-solid
    border-4
    border-gray-300
    shadow-md
  `}

  border-radius: 50%;
  background-image: url(${({ background }) => background});

  input {
    display: none;
  }

  span {
    left: 120%;
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
