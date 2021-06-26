import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../../assets/web-logo.svg";
import { useHistory } from "react-router-dom";
import RoundedObject from "../../components/RoundedObject";
import { FaPlus, FaUserFriends, FaBell, FaCommentAlt } from "react-icons/fa";
import queryString from "query-string";
import { RoundedObjectType } from "../../typings/RoundedObjectType";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [option, setOption] = useState<string | string[] | null>();

  const history = useHistory();

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

  const roundedObjects: RoundedObjectType[] = [
    {
      content: "Rooms",
      icon: <FaCommentAlt />,
      clickHandler: getToRooms,
      option,
    },
    {
      content: "Friends",
      icon: <FaUserFriends />,
      clickHandler: getToFriends,
      option,
    },
    {
      content: "Alerts",
      icon: <FaBell />,
      clickHandler: getToAlerts,
      option,
    },
    {
      content: "Add new rooms",
      icon: <FaPlus />,
      clickHandler: openAddNewRoomModal,
      option,
    },
  ];

  useEffect(() => {
    setOption("rooms");

    const { opt } = queryString.parse(location.search);

    if (opt) setOption(opt);
  }, [location.search]);

  return (
    <ChatContainer>
      <ListRoomsContainer>
        <img src={Logo} onClick={getBackToHome} />

        <LineBreak />

        {roundedObjects.map((object) => (
          <RoundedObject {...object} />
        ))}
      </ListRoomsContainer>

      <RoomOptionsContainer>Overview</RoomOptionsContainer>

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

const ListRoomsContainer = styled.div`
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
    my-4
    w-2/3
  `}

  height: 2px;
  background-color: hsla(0, 0%, 100%, 0.06);
`;

const RoomOptionsContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #2f3136;
  flex: 0.2;
`;

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #36393f;
  flex: 0.8;
`;
