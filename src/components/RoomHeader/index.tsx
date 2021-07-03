import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleDown } from "react-icons/fa";
import { RoomType } from "../../typings/RoomType";
import Tooltip from "../Tooltip";

interface IRoomHeader {
  selectedRoom?: RoomType;
}

const RoomHeader: FC<IRoomHeader> = ({ selectedRoom }) => {
  return (
    <RoomHeaderContainer>
      <RoomName>{selectedRoom?.name}</RoomName>
      <Icon>
        <FaAngleDown />
        <Tooltip content="Room setting" arrow="top" />
      </Icon>
    </RoomHeaderContainer>
  );
};

export default RoomHeader;

const RoomHeaderContainer = styled.div`
  ${tw`
    p-3
    flex
    items-center
    justify-between
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);

  &:hover {
    background-color: rgba(79, 84, 92, 0.16);
  }
`;

const RoomName = styled.p`
  ${tw`
    text-base
  `}
`;

const Icon = styled.span`
  ${tw`
    text-base
    text-gray-400
    relative
  `}

  span {
    top: 350%;
    left: 50%;
    transform: translate(-50%, -50%);
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
