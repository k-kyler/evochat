import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AiOutlineExport, AiOutlinePlusCircle } from "react-icons/ai";
import { SearchRoomItemType } from "../../../typings/SearchRoomItemType";
import RoomIntroImage from "../../../assets/room-intro.svg";
import { useHistory } from "react-router";
import { useSelectedRoomId } from "../../../contexts/SelectedRoomIdContext";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";

interface ISearchRoomItemProps extends SearchRoomItemType {
  closeHandler: () => void;
}

const SearchRoomItem: FC<ISearchRoomItemProps> = ({
  name,
  background,
  id,
  isJoined,
  closeHandler,
}) => {
  const history = useHistory();

  const { setSelectedRoomId } = useSelectedRoomId();
  const { user } = useAuth();

  const openJoinedRoom = () => {
    closeHandler();
    setSelectedRoomId(id);
    history.push(`/chat?id=${id}`);
  };

  const sendJoinRoomRequest = () => {
    db.collection("rooms")
      .doc(id)
      .collection("members")
      .add({
        uid: user?.uid,
        timestamp: new Date(),
      })
      .then((docRef) => {
        if (docRef.id) {
          closeHandler();
        }
      });
  };

  return (
    <SearchRoomItemContainer>
      <InfoContainer>
        {background ? (
          <BackgroundContainer background={background} />
        ) : (
          <ImageContainer>
            <img src={RoomIntroImage} />
          </ImageContainer>
        )}
        <RoomName title={name}>{name}</RoomName>
      </InfoContainer>

      <Icon
        isJoined={isJoined}
        onClick={isJoined ? openJoinedRoom : sendJoinRoomRequest}
      >
        {isJoined ? (
          <AiOutlineExport title="Open room" />
        ) : (
          <AiOutlinePlusCircle title="Join room" />
        )}
      </Icon>
    </SearchRoomItemContainer>
  );
};

export default SearchRoomItem;

const SearchRoomItemContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    p-2
    w-full
    rounded-lg
    transition-all
    duration-300
    ease-in-out
    bg-green-50
  `}
`;

const InfoContainer = styled.div`
  ${tw`
    flex
    items-center
    flex-1
  `}
`;

const ImageContainer = styled.div`
  img {
    ${tw`
      h-9
    `}
  }
`;

const BackgroundContainer = styled.div<{ background: string }>`
  ${tw`
    h-9
    w-9
    bg-cover
    bg-center
    bg-no-repeat
  `}

  border-radius: 50%;

  background-image: url(${({ background }) => background});
`;

const RoomName = styled.p`
  ${tw`
    text-base
    ml-2
    overflow-ellipsis
    overflow-x-hidden
    whitespace-nowrap
    w-full
  `}

  max-width: 9.5em;
`;

const Icon = styled.span<{ isJoined?: boolean }>`
  ${tw`
    text-xl
    cursor-pointer
  `}

  ${({ isJoined }) =>
    isJoined
      ? tw`
    text-gray-400
  `
      : tw`
    text-green-400
  `}
`;
