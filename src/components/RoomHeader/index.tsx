import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleDown } from "react-icons/fa";
import { RoomType } from "../../typings/RoomType";
import Panel from "../Panel";
import { PanelOptionType } from "../../typings/PanelOptionType";
import {
  FcAbout,
  FcLandscape,
  FcImport,
  FcDocument,
  FcSupport,
  FcHighPriority,
} from "react-icons/fc";

interface IRoomHeader {
  selectedRoom?: RoomType;
}

const RoomHeader: FC<IRoomHeader> = ({ selectedRoom }) => {
  const adminPanelData: PanelOptionType[] = [
    {
      name: "Change name",
      icon: <FcDocument />,
    },
    {
      name: "Change background",
      icon: <FcLandscape />,
    },
    {
      name: "Delete room",
      icon: <FcHighPriority />,
    },
  ];

  const panelGeneralData: PanelOptionType[] = [
    {
      name: "Room setting",
      icon: <FcSupport />,
    },
    {
      name: "Invite member",
      icon: <FcAbout />,
      highlight: "blue",
    },
    {
      name: "Leave room",
      icon: <FcImport />,
      highlight: "red",
    },
  ];

  return (
    <RoomHeaderContainer>
      <RoomName title={selectedRoom?.name}>{selectedRoom?.name}</RoomName>
      <Icon>
        <FaAngleDown />
      </Icon>
      <Panel />
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
    transition-all
    duration-300
    ease-in-out
    relative
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);

  &:hover {
    background-color: rgba(79, 84, 92, 0.16);
  }
`;

const RoomName = styled.p`
  ${tw`
    text-base
    overflow-ellipsis
    overflow-x-hidden
    whitespace-nowrap
    w-full
    cursor-pointer
  `}

  max-width: 13em;
`;

const Icon = styled.span`
  ${tw`
    text-lg
    text-gray-400
    relative
    cursor-pointer
  `}
`;
