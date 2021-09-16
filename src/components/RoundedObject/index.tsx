import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import CustomReactTooltip from "../Tooltip/CustomReactTooltip";

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
        data-tip={content}
      >
        <CustomReactTooltip />

        {type === "room" ? (
          <>
            <AdditionalActive />

            {/* Display room background if it's existed else display first letter of room name */}
            {background ? (
              <BackgroundContainer background={background} />
            ) : (
              <Text>{content[0].toUpperCase()}</Text>
            )}
          </>
        ) : (
          <></>
        )}
      </RoundedObjectContainer>
    );
  return (
    <RoundedObjectContainer
      background={background}
      type={type}
      onClick={clickHandler && clickHandler}
      data-tip={content}
    >
      <CustomReactTooltip />

      {type === "room" ? (
        <>
          <AdditionalActive />

          {/* Display room background if it's existed else display first letter of room name */}
          {background ? (
            <BackgroundContainer background={background} />
          ) : (
            <Text>{content[0].toUpperCase()}</Text>
          )}
        </>
      ) : (
        <Icon>{icon}</Icon>
      )}
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

  border-radius: 50%;
  background-color: #36393f;

  span {
    color: #3ba55d;
  }

  &:hover {
    ${tw`rounded-xl`}

    ${({ background }) =>
      !background &&
      css`
        background-color: #3ba55d;
      `}

    span {
      color: white;
    }

    div:nth-child(2) {
      ${tw`visible`}
    }

    div:nth-child(3) {
      ${tw`rounded-xl`}
    }
  }

  ${({ background }) => !background && tw`p-3`}

  ${({ type, background }) =>
    type === "room" && !background && tw`hover:bg-blue-500`}

  ${({ active, type, background }) =>
    active &&
    type === "room" &&
    css`
      ${!background &&
      tw`
        bg-blue-500
        rounded-xl
      `}

      ${background &&
      tw`
        rounded-xl
      `}

      div:nth-child(2) {
        ${tw`
          visible
          transition-all
          duration-300
          ease-in-out
        `}

        height: 2.4rem;
      }

      div:nth-child(3) {
        ${tw`
          transition-all
          duration-300
          ease-in-out
          rounded-xl
        `}
      }
    `}
`;

const BackgroundContainer = styled.div<{ background: string }>`
  ${tw`
    transition-all
    duration-300
    ease-in-out
    h-12
    w-12
    bg-cover
    bg-center
    bg-no-repeat
  `}

  border-radius: 50%;
  background-image: url(${({ background }) => background});
`;

const Icon = styled.span`
  ${tw`
    text-2xl
  `}
`;

const Text = styled.p`
  ${tw`
    text-sm
    text-center
    w-6
    h-6
    flex
    items-center
    justify-center
  `}
`;

const AdditionalActive = styled.div`
  ${tw`
    absolute
    left-0
    bg-white
    rounded-tr-md
    rounded-br-md
    invisible
    w-1
  `}

  height: 1.2rem;
`;
