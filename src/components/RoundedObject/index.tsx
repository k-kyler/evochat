import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { RoundedObjectType } from "../../typings/RoundedObjectType";

interface IRoundedObject extends RoundedObjectType {
  selectedRoomId?: string;
}

const RoundedObject: FC<IRoundedObject> = ({
  id,
  content,
  icon,
  background,
  type,
  clickHandler,
  selectedRoomId,
}) => {
  // Set active styles if room is selected
  if (id === selectedRoomId)
    return (
      <RoundedObjectContainer
        active
        background={background}
        type={type}
        onClick={clickHandler && clickHandler}
      >
        {type === "room" ? (
          <>
            <AdditionalActiveObject />

            {/* Display room background if it's existed else display first letter of room name */}
            {background ? (
              <img
                src={background}
                alt={`${(<Text>{content[0].toUpperCase()}</Text>)}`}
              />
            ) : (
              <Text>{content[0].toUpperCase()}</Text>
            )}
          </>
        ) : (
          <Icon>{icon}</Icon>
        )}
        <Tooltip>{content}</Tooltip>
      </RoundedObjectContainer>
    );
  return (
    <RoundedObjectContainer
      background={background}
      type={type}
      onClick={clickHandler && clickHandler}
    >
      {type === "room" ? (
        <>
          <AdditionalActiveObject />

          {/* Display room background if it's existed else display first letter of room name */}
          {background ? (
            <img
              src={background}
              alt={`${(<Text>{content[0].toUpperCase()}</Text>)}`}
            />
          ) : (
            <Text>{content[0].toUpperCase()}</Text>
          )}
        </>
      ) : (
        <Icon>{icon}</Icon>
      )}
      <Tooltip>{content}</Tooltip>
    </RoundedObjectContainer>
  );
};

export default RoundedObject;

const RoundedObjectContainer = styled.div<{
  active?: boolean;
  type?: string;
  background?: string;
}>`
  ${tw`
    mb-3
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    flex
    items-center
  `}

  border-radius: 50px;
  background-color: #36393f;

  img {
    height: 2.75rem;
    width: 2.75rem;
    border-radius: 50px;
  }

  span:nth-child(1) {
    color: #3ba55d;
  }

  &:hover {
    ${tw`rounded-xl`}

    background-color: #3ba55d;

    img {
      ${tw`
        transition-all
        duration-300
        ease-in-out
        rounded-xl
      `}
    }

    span:nth-child(1) {
      color: white;
    }

    span:nth-child(2),
    span:nth-child(3) {
      ${tw`
        visible
        text-white
      `}
    }

    div:nth-child(1) {
      ${tw`visible`}
    }
  }

  &:not(:hover) {
    img {
      ${tw`
        transition-all
        duration-300
        ease-in-out
      `}
    }
  }

  ${({ background }) => !background && tw`p-3`}

  ${({ type }) => type === "room" && tw`hover:bg-blue-500`}

  ${({ active, type }) =>
    active &&
    type === "room" &&
    css`
      ${tw`
        bg-blue-500
        rounded-xl
      `}

      img {
        ${tw`
          transition-all
          duration-300
          ease-in-out
          rounded-xl
        `}
      }

      div:nth-child(1) {
        ${tw`
          visible
          transition-all
          duration-300
          ease-in-out
        `}

        height: 2.4rem;
      }
    `}
`;

const Icon = styled.span`
  ${tw`
    text-xl
  `}
`;

const Text = styled.p`
  ${tw`
    text-sm
    text-center
  `}

  width: 1.25rem;
  height: 1.25rem;
`;

const AdditionalActiveObject = styled.div`
  ${tw`
    absolute
    left-0
    bg-white
    rounded-tr-md
    rounded-br-md
    invisible
  `}

  width: 0.25rem;
  height: 1.2rem;
`;

const Tooltip = styled.span`
  ${tw`
    absolute
    text-center
    text-sm
    rounded-md
    invisible
    p-2
  `}

  background-color: rgba(0, 0, 0, 0.95);
  width: max-content;
  z-index: 1;
  left: 105%;

  &::after {
    ${tw`
      absolute
      right-full
      top-2/4
    `}

    content: "";
    margin-top: -7px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
`;
