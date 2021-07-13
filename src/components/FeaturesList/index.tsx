import { FC, useState, useEffect } from "react";
import Logo from "../../assets/web-logo.svg";
import RoundedObject from "../RoundedObject";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import { useRooms } from "../../contexts/RoomsContext";
import { nanoid } from "nanoid";

const FeaturesList: FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [openCreateNewRoomModal, setOpenCreateNewRoomModal] = useState(false);

  const history = useHistory();

  const { rooms } = useRooms();

  const getBackToHome = () => {
    history.push("/");
  };

  const switchRoomHandler = (id: string) => {
    setSelectedRoomId(id);
    history.push(`/chat?id=${id}`);
  };

  const searchRoomModalHandler = () => {};

  const options: RoundedObjectType[] = [
    {
      id: nanoid(),
      content: "Search room",
      icon: <FaSearch />,
      clickHandler: searchRoomModalHandler,
    },
    {
      id: nanoid(),
      content: "Create new room",
      icon: <FaPlus />,
      clickHandler: () => setOpenCreateNewRoomModal(true),
    },
  ];

  useEffect(() => {
    if (rooms?.length) {
      setSelectedRoomId(rooms[0].id);
      history.push(`/chat?id=${rooms[0].id}`);
    }
  }, [rooms]);

  return (
    <>
      <FeaturesListContainer>
        <InnerContainer>
          <ImageContainer>
            <img src={Logo} onClick={getBackToHome} />
          </ImageContainer>

          {options.map((option) => (
            <RoundedObject key={option.id} {...option} />
          ))}

          <LineBreak />

          {rooms?.map((room) => (
            <RoundedObject
              key={room.id}
              id={room.id}
              content={room.name}
              background={room.background}
              type="room"
              selectedRoomId={selectedRoomId}
              clickHandler={() => switchRoomHandler(room.id)}
            />
          ))}
        </InnerContainer>
      </FeaturesListContainer>

      <Modal
        type="create-room"
        title="Create new room"
        description="Dive into your awesome room by giving it a nice background and name"
        open={openCreateNewRoomModal}
        closeHandler={() => setOpenCreateNewRoomModal(false)}
      />
    </>
  );
};

export default FeaturesList;

const FeaturesListContainer = styled.div`
  ${tw`
  text-white
    pt-3
    px-3
    relative
    overflow-x-hidden
    overflow-y-auto
  `}

  background-color: #202225;
  scroll-behavior: smooth;

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Firefox */
  scrollbar-width: none;
`;

const ImageContainer = styled.div`
  img {
    ${tw`
      h-11
      cursor-pointer
      mb-3
    `}
  }
`;

const InnerContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const LineBreak = styled.div`
  ${tw`
    mb-3
    w-2/3
  `}

  height: 2px;
  background-color: hsla(0, 0%, 100%, 0.06);
`;
