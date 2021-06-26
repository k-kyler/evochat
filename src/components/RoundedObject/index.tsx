import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { RoundedObjectType } from "../../typings/RoundedObjectType";

interface IRoundedObject extends RoundedObjectType {}

const RoundedObject: FC<IRoundedObject> = ({
  content,
  icon,
  option,
  clickHandler,
}) => {
  if (option === content.toLowerCase())
    return (
      <RoundedObjectContainer active onClick={clickHandler && clickHandler}>
        <Icon>{icon}</Icon>
        <Tooltip>{content}</Tooltip>
      </RoundedObjectContainer>
    );
  return (
    <RoundedObjectContainer onClick={clickHandler && clickHandler}>
      <Icon>{icon}</Icon>
      <Tooltip>{content}</Tooltip>
    </RoundedObjectContainer>
  );
};

export default RoundedObject;

const RoundedObjectContainer = styled.div<{ active?: boolean }>`
  ${tw`
    p-3
    mb-3
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    relative
    flex
    items-center
  `}

  border-radius: 50px;
  background-color: #36393f;

  &:hover {
    background-color: #3ba55d;
    border-radius: 14px;

    span:nth-child(1) {
      color: white;
    }

    span:nth-child(2) {
      ${tw`
        visible
        text-gray-300
      `}
    }
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #3ba55d;
      border-radius: 14px;

      span:nth-child(1) {
        color: white;
      }
    `}
`;

const Icon = styled.span`
  ${tw`
    text-xl
    text-white
  `}
`;

const Tooltip = styled.span`
  ${tw`
    absolute
    bg-black
    text-center
    text-sm
    font-semibold
    rounded-md
    invisible
    p-2
  `}

  width: max-content;
  z-index: 1;
  left: 135%;

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
