import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleDown } from "react-icons/fa";
import { useRooms } from "../../contexts/RoomsContext";
import { QueryType } from "../../typings/QueryType";
import { RoomType } from "../../typings/RoomType";

interface IRoomHeaderProps extends QueryType {}

const RoomHeader: FC<IRoomHeaderProps> = ({ id }) => {
  const [roomInfo, setRoomInfo] = useState<RoomType>();

  const { rooms } = useRooms();

  const getRoomHandler = () => {
    const room = rooms?.filter((r) => r.id === id)[0];

    setRoomInfo(room);
  };

  useEffect(() => {
    if (rooms?.length) getRoomHandler();
  }, [rooms, id]);

  return (
    <RoomHeaderContainer>
      <RoomName>{roomInfo?.name}</RoomName>
      <Icon>
        <FaAngleDown />
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
  `}
`;
