import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../../assets/web-logo.svg";
import { useHistory } from "react-router-dom";
import RoundedObject from "../../components/RoundedObject";
import { FaPlus, FaUserFriends, FaBell, FaClone, FaCog } from "react-icons/fa";
import queryString from "query-string";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import { useAuth } from "../../contexts/AuthContext";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [option, setOption] = useState<string | string[] | null>();

  const { user } = useAuth();

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
      icon: <FaClone />,
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
      content: "Add new room",
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

        {roundedObjects.map((object, index) => {
          if (index === roundedObjects.length - 1)
            return (
              <>
                <LineBreak style={{ marginTop: "0" }} />
                <RoundedObject key={object.content} {...object} />
              </>
            );
          return <RoundedObject key={object.content} {...object} />;
        })}
      </ListRoomsContainer>

      <OptionsContainer>
        <HeaderContainer>
          <HeaderContent>{option}</HeaderContent>
        </HeaderContainer>

        <ListContainer></ListContainer>

        <BottomContainer>
          <BottomUser>
            <img src={String(user?.photoURL)} />
            <BottomContent>{user?.displayName}</BottomContent>
          </BottomUser>
          <BottomIcon>
            <FaCog />
          </BottomIcon>
        </BottomContainer>
      </OptionsContainer>

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
    my-3
    w-2/3
  `}

  height: 2px;
  background-color: hsla(0, 0%, 100%, 0.06);
`;

const OptionsContainer = styled.div`
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
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);
`;

const HeaderContent = styled.p`
  ${tw`
    text-base
    font-semibold
    capitalize
  `}
`;

const ListContainer = styled.div`
  ${tw`
    flex-1
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
    font-medium
  `}
`;

const BottomIcon = styled.span`
  ${tw`
    cursor-pointer
    text-lg
    p-2
    rounded-md
    transition-all
    duration-300
    ease-in-out
  `}

  color: lightgray;

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
