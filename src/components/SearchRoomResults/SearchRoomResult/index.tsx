import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BiMessageAdd } from "react-icons/bi";
import { SearchRoomResultType } from "../../../typings/SearchRoomResultType";
import RoomIntroImage from "../../../assets/room-intro.svg";

interface ISearchRoomResultProps extends SearchRoomResultType {}

const SearchRoomResult: FC<ISearchRoomResultProps> = ({
  name,
  background,
  id,
}) => {
  return (
    <SearchRoomResultContainer>
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
        <BiMessageAdd />
      </Icon>
    </SearchRoomResultContainer>
  );
};

export default SearchRoomResult;

const SearchRoomResultContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    px-2
    py-1
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
  `}
`;

const ImageContainer = styled.div`
  img {
    ${tw`
      h-11
    `}
  }
`;

const BackgroundContainer = styled.div<{ background: string }>`
  ${tw`
    h-11
    w-11
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
    text-gray-500
    cursor-pointer
  `}
`;
