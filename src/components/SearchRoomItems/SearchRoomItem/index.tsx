import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SearchRoomItemType } from "../../../typings/SearchRoomItemType";
import RoomIntroImage from "../../../assets/room-intro.svg";

interface ISearchRoomItemProps extends SearchRoomItemType {}

const SearchRoomItem: FC<ISearchRoomItemProps> = ({ name, background, id }) => {
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

      <Icon>
        <AiOutlinePlusCircle />
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

const Icon = styled.span`
  ${tw`
    text-xl
    text-green-400
    cursor-pointer
  `}
`;
