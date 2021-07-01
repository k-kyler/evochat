import { FC, useState, useEffect } from "react";
import Logo from "../../assets/web-logo.svg";
import RoundedObject from "../RoundedObject";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { FaPlus, FaSignInAlt } from "react-icons/fa";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import { useRooms } from "../../contexts/RoomsContext";

const FeaturesList: FC = () => {
  const [chosenRoomId, setChosenRoomId] = useState("");

  const history = useHistory();

  const { rooms } = useRooms();

  const getBackToHome = () => {
    history.push("/");
  };

  const switchRoomHandler = (id: string) => {
    setChosenRoomId(id);
    history.push(`/chat?id=${id}`);
  };

  const openFindRoomModal = () => {};

  const openCreateNewRoomModal = () => {};

  const options: RoundedObjectType[] = [
    {
      content: "Find room",
      icon: <FaSignInAlt />,
      clickHandler: openFindRoomModal,
    },
    {
      content: "Create new room",
      icon: <FaPlus />,
      clickHandler: openCreateNewRoomModal,
    },
  ];

  useEffect(() => {
    if (rooms?.length) {
      setChosenRoomId(rooms[0].id);
      history.push(`/chat?id=${rooms[0].id}`);
    }
  }, [rooms]);

  return (
    <FeaturesListContainer>
      <img src={Logo} onClick={getBackToHome} />

      <LineBreak />

      {rooms?.map((room) => (
        <RoundedObject
          key={room.id}
          id={room.id}
          content={room.name}
          type="room"
          chosenRoomId={chosenRoomId}
          clickHandler={() => switchRoomHandler(room.id)}
        />
      ))}

      {options.map((option) => (
        <RoundedObject key={option.content} {...option} />
      ))}
    </FeaturesListContainer>
  );
};

export default FeaturesList;

const FeaturesListContainer = styled.div`
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
