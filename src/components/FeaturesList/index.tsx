import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import Logo from "../../assets/web-logo.svg";
import RoundedObject from "../RoundedObject";
import Modal from "../Modal";
import CustomReactTooltip from "../Tooltip/CustomReactTooltip";
import { RoundedObjectType } from "../../typings/RoundedObjectType";
import { useRooms } from "../../contexts/RoomsContext";

interface IFeaturesListProps {
  joinedRoomIds: string[];
}

const FeaturesList: FC<IFeaturesListProps> = ({ joinedRoomIds }) => {
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [openCreateNewRoomModal, setOpenCreateNewRoomModal] = useState(false);
  const [openSearchRoomModal, setOpenSearchRoomModal] = useState(false);

  const history = useHistory();

  const { rooms } = useRooms();

  const getBackToHome = () => {
    history.push("/");
  };

  const switchRoomHandler = (id: string) => {
    setSelectedRoomId(id);
    history.push(`/chat?id=${id}`);
  };

  const options: RoundedObjectType[] = [
    {
      id: nanoid(),
      content: "Search room",
      icon: <FaSearch />,
      clickHandler: () => setOpenSearchRoomModal(true),
    },
    {
      id: nanoid(),
      content: "Create new room",
      icon: <FaPlus />,
      clickHandler: () => setOpenCreateNewRoomModal(true),
    },
  ];

  useEffect(() => {
    if (joinedRoomIds.length) {
      setSelectedRoomId(joinedRoomIds[0]);
      history.push(`/chat?id=${joinedRoomIds[0]}`);
    }
  }, [joinedRoomIds]);

  return (
    <>
      <FeaturesListInnerContainer>
        <ImageContainer>
          <img src={Logo} data-tip="Home" onClick={getBackToHome} />
          <CustomReactTooltip />
        </ImageContainer>

        {options.map((option) => (
          <RoundedObject key={option.id} {...option} />
        ))}

        {rooms?.length ? <LineBreak /> : null}

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
      </FeaturesListInnerContainer>

      <Modal
        type="create-room"
        title="Create new room"
        description="Dive into your awesome room by giving it a nice background and name"
        open={openCreateNewRoomModal}
        closeHandler={() => setOpenCreateNewRoomModal(false)}
        setOpenSearchRoomModal={setOpenSearchRoomModal}
      />

      <Modal
        type="search-room"
        title="Search new room"
        open={openSearchRoomModal}
        closeHandler={() => setOpenSearchRoomModal(false)}
        setOpenCreateNewRoomModal={setOpenCreateNewRoomModal}
      />
    </>
  );
};

export default FeaturesList;

const FeaturesListInnerContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const ImageContainer = styled.div`
  ${tw`
    mb-3
  `}

  img {
    ${tw`
      h-12
      cursor-pointer
    `}
  }
`;

const LineBreak = styled.div`
  ${tw`
    mb-3
    w-2/3
  `}

  height: 2px;
  background-color: hsla(0, 0%, 100%, 0.06);
`;
