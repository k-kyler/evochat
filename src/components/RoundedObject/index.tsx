import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import Tooltip from "../Tooltip";

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
            <AdditionalActive />

            {/* Display room background if it's existed else display first letter of room name */}
            {background ? (
              <img src={background} />
            ) : (
              <Text>{content[0].toUpperCase()}</Text>
            )}
          </>
        ) : (
          <Icon>{icon}</Icon>
        )}

        <Tooltip left={105} content={content} arrow="left" />
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
          <AdditionalActive />

          {/* Display room background if it's existed else display first letter of room name */}
          {background ? (
            <img src={background} />
          ) : (
            <Text>{content[0].toUpperCase()}</Text>
          )}
        </>
      ) : (
        <Icon>{icon}</Icon>
      )}

      <Tooltip left={105} content={content} arrow="left" />
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
    ${tw`
      transition-all
      duration-300
      ease-in-out
    `}

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
      ${tw`rounded-xl`}
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

  ${({ background }) => !background && tw`p-3`}

  ${({ type }) => type === "room" && tw`hover:bg-blue-500`}

  ${({ active, type, background }) =>
    active &&
    type === "room" &&
    css`
      ${!background &&
      tw`
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

const AdditionalActive = styled.div`
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
