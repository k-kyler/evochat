import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  FiVolume2,
  FiVolumeX,
  FiUsers,
  FiGrid,
  FiTwitch,
} from "react-icons/fi";
import { useRooms } from "../../contexts/RoomsContext";
import { QueryType } from "../../typings/QueryType";
import { RoomType } from "../../typings/RoomType";

interface IChatAreaHeaderProps extends QueryType {}

const ChatAreaHeader: FC<IChatAreaHeaderProps> = ({ id }) => {
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
    <ChatAreaHeaderContainer>
      <RoomInfoContainer>
        {roomInfo?.background ? (
          <img src={String(roomInfo?.background)} />
        ) : (
          <LargeIcon>
            <FiTwitch />
          </LargeIcon>
        )}
        <RoomName>{roomInfo?.name}</RoomName>
      </RoomInfoContainer>

      <Icons>
        <Icon>
          <FiVolume2 />
        </Icon>
        <Icon>
          <FiUsers />
        </Icon>
        <Icon>
          <FiGrid />
        </Icon>
      </Icons>
    </ChatAreaHeaderContainer>
  );
};

export default ChatAreaHeader;

const ChatAreaHeaderContainer = styled.div`
  ${tw`
    p-3
    flex
    items-center
    justify-between
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);
`;

const RoomInfoContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  img {
    ${tw`
      mr-2
      rounded-full
    `}

    width: 1.7rem;
    height: 1.7rem;
  }
`;

const RoomName = styled.p`
  ${tw`
    text-base
  `}
`;

const Icons = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
    p-1
    cursor-pointer
    text-xl
    text-gray-400
    transition-all
    duration-300
    ease-in-out
    hover:opacity-80
  `}

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const LargeIcon = styled.span`
  ${tw`
    text-2xl
    text-gray-400
    mr-2
  `}
`;
