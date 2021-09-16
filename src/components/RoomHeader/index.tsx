import { FC, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import {
  FcAbout,
  FcLandscape,
  FcImport,
  FcDocument,
  FcBarChart,
  FcLeave,
} from "react-icons/fc";
import { nanoid } from "nanoid";
import Panel from "./Panel";
import Modal from "../Modal";
import { RoomType } from "../../typings/RoomType";
import { PanelOptionType } from "../../typings/PanelOptionType";

interface IRoomHeader {
  selectedRoom?: RoomType;
  isBlank?: boolean;
}

const RoomHeader: FC<IRoomHeader> = ({ selectedRoom, isBlank }) => {
  const [openPanel, setOpenPanel] = useState(false);
  const [rotateState, setRotateState] = useState(true);
  const [openChangeRoomNameModal, setOpenChangeRoomNameModal] = useState(false);

  const iconRef = useRef<HTMLSpanElement>(null);

  const adminPanelData: PanelOptionType[] = [
    {
      id: nanoid(),
      name: "Room Info",
      icon: <FcBarChart />,
      bottomDivider: true,
    },
    {
      id: nanoid(),
      name: "Change name",
      icon: <FcDocument />,
      clickHandler: () => setOpenChangeRoomNameModal(true),
    },
    {
      id: nanoid(),
      name: "Change background",
      icon: <FcLandscape />,
      bottomDivider: true,
    },
    {
      id: nanoid(),
      name: "Invite member",
      icon: <FcAbout />,
      highlight: "blue",
      bottomDivider: true,
    },
    {
      id: nanoid(),
      name: "Leave room",
      icon: <FcImport />,
      highlight: "red",
    },
    {
      id: nanoid(),
      name: "Delete room",
      icon: <FcLeave />,
      highlight: "red",
    },
  ];

  const generalPanelData: PanelOptionType[] = [
    {
      id: nanoid(),
      name: "Room Info",
      icon: <FcBarChart />,
      bottomDivider: true,
    },
    {
      id: nanoid(),
      name: "Invite member",
      icon: <FcAbout />,
      highlight: "blue",
      bottomDivider: true,
    },
    {
      id: nanoid(),
      name: "Leave room",
      icon: <FcImport />,
      highlight: "red",
    },
  ];

  const openPanelHandler = () => {
    const icon = iconRef.current;

    setOpenPanel(!openPanel);
    setRotateState(!rotateState);

    if (icon) {
      icon.style.transform = `rotate(${rotateState ? "270" : "0"}deg)`;
      icon.style.transition = "all 0.2s ease-in-out";
    }
  };

  return (
    <>
      <RoomHeaderContainer onClick={openPanelHandler}>
        {isBlank ? (
          <RoomName isBlank={isBlank}>⚡ Activity overview</RoomName>
        ) : (
          <>
            <RoomName title={selectedRoom?.name}>{selectedRoom?.name}</RoomName>
            <Icon ref={iconRef}>
              {openPanel ? <FaTimes /> : <FaAngleDown />}
            </Icon>
            <Panel
              oid={selectedRoom?.oid}
              generalData={generalPanelData}
              adminData={adminPanelData}
              open={openPanel}
            />
          </>
        )}
      </RoomHeaderContainer>

      <Modal
        type="edit-room-name"
        title="Change room name"
        open={openChangeRoomNameModal}
        closeHandler={() => setOpenChangeRoomNameModal(false)}
        defaultInput={selectedRoom?.name}
      />
    </>
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
    select-none
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);

  &:hover {
    background-color: rgba(79, 84, 92, 0.16);
  }
`;

const RoomName = styled.p<{ isBlank?: boolean }>`
  ${tw`
    text-lg
    overflow-ellipsis
    overflow-x-hidden
    whitespace-nowrap
    w-full
    cursor-pointer
  `}

  max-width: 12em;

  ${({ isBlank }) =>
    isBlank &&
    tw`
    pointer-events-none
  `}
`;

const Icon = styled.span`
  ${tw`
    text-lg
    text-gray-400
    relative
    cursor-pointer
  `}
`;
