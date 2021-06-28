import { FC } from "react";
import Logo from "../../assets/web-logo.svg";
import RoundedObject from "../RoundedObject";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { FaPlus, FaUserFriends, FaBell, FaClone } from "react-icons/fa";
import { RoundedObjectType } from "../../typings/RoundedObjectType";

const ListOptions: FC = () => {
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

  return (
    <ListOptionsContainer>
      <img src={Logo} onClick={getBackToHome} />

      <LineBreak />

      {roundedObjects.map((object) => {
        return <RoundedObject key={object.content} {...object} />;
      })}
    </ListOptionsContainer>
  );
};

export default ListOptions;

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
