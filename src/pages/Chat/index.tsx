import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../../assets/web-logo.svg";
import { useHistory } from "react-router-dom";
import RoundedObject from "../../components/RoundedObject";
import { FaPlus, FaUserFriends, FaBell, FaClone } from "react-icons/fa";
import { RiListSettingsLine } from "react-icons/ri";
import {
  HiOutlineSortDescending,
  HiOutlineSortAscending,
} from "react-icons/hi";
import queryString from "query-string";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import { useAuth } from "../../contexts/AuthContext";
import RoomItem from "../../components/RoomItem";
import { RoomType } from "../../typings/RoomType";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [option, setOption] = useState<string | string[] | null>();
  const [chosenId, setChosenId] = useState("");

  const { user } = useAuth();

  const history = useHistory();

  const { opt } = queryString.parse(location.search);

  const getBackToHome = () => {
    history.push("/");
  };

  const getToRooms = () => {
    history.push("/chat");
  };

  const getToFriends = () => {
    history.push("/chat?opt=friends");
  };

  const getToAlerts = () => {
    history.push("/chat?opt=alerts");
  };

  const openAddNewRoomModal = () => {};

  const roomChosenHandler = () => {};

  const roundedObjects: RoundedObjectType[] = [
    {
      content: "Rooms",
      icon: <FaClone />,
      clickHandler: getToRooms,
    },
    {
      content: "Friends",
      icon: <FaUserFriends />,
      clickHandler: getToFriends,
    },
    {
      content: "Alerts",
      icon: <FaBell />,
      clickHandler: getToAlerts,
    },
    {
      content: "Add new room",
      icon: <FaPlus />,
      clickHandler: openAddNewRoomModal,
    },
  ];

  const rooms: RoomType[] = [
    {
      id: "0",
      name: "Kkyler's chat",
    },
    {
      id: "1",
      name: "Gaming room",
    },
  ];

  useEffect(() => {
    setOption("rooms");
    setChosenId(rooms[0].id);

    if (opt) setOption(opt);
  }, [location.search]);

  return (
    <ChatContainer>
      <ListOptionsContainer>
        <img src={Logo} onClick={getBackToHome} />

        <LineBreak />

        {roundedObjects.map((object) => {
          return (
            <RoundedObject key={object.content} {...object} option={option} />
          );
        })}
      </ListOptionsContainer>

      <CurrentOptionContainer>
        <HeaderContainer>
          <HeaderContent>{option}</HeaderContent>
          <Icon>
            <HiOutlineSortDescending />
          </Icon>
        </HeaderContainer>

        <ListContainer>
          {option === "rooms"
            ? rooms.map((room) => (
                <RoomItem key={room.id} {...room} chosenId={chosenId} />
              ))
            : null}
        </ListContainer>

        <BottomContainer>
          <BottomUser>
            <img src={String(user?.photoURL)} />
            <BottomContent>{user?.displayName}</BottomContent>
          </BottomUser>
          <Icon>
            <RiListSettingsLine />
          </Icon>
        </BottomContainer>
      </CurrentOptionContainer>

      <ChatAreaContainer>Chat area</ChatAreaContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
  `}
`;

const ListOptionsContainer = styled.div`
  ${tw`
  text-white
    p-3
    flex
    flex-col
    items-center
  `}

  background-color: #202225;

  img {
    height: 3rem;
    cursor: pointer;
  }
`;

const LineBreak = styled.div`
  ${tw`
    my-3
    w-2/3
  `}

  height: 2px;
  background-color: hsla(0, 0%, 100%, 0.06);
`;

const CurrentOptionContainer = styled.div`
  ${tw`
    text-white
    flex
    flex-col
  `}

  background-color: #2f3136;
  flex: 0.2;
`;

const HeaderContainer = styled.div`
  ${tw`
    p-3
    flex
    items-center
    justify-between
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);

  span {
    padding: 0;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const HeaderContent = styled.p`
  ${tw`
    text-base
    capitalize
  `}
`;

const ListContainer = styled.div`
  ${tw`
    flex-1
    px-3
    py-4
  `}
`;

const BottomContainer = styled.div`
  ${tw`
    px-2
    py-3
    flex
    items-center
    justify-between
  `}

  background-color: #292b2f;
`;

const BottomUser = styled.div`
  ${tw`
    flex
    items-center
  `}

  img {
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 50px;
  }
`;

const BottomContent = styled.p`
  ${tw`
    text-sm
  `}
`;

const Icon = styled.span`
  ${tw`
    cursor-pointer
    text-lg
    p-2
    rounded-md
    transition-all
    duration-300
    ease-in-out
    text-gray-300
  `}

  &:hover {
    background-color: #2f3136;
  }
`;

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #36393f;
  flex: 0.8;
`;
