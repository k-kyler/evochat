import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinnerTwo } from "react-icons/cg";
import SearchRoomItem from "./SearchRoomItem";
import FindImage from "../../assets/find.svg";
import { SearchRoomItemType } from "../../typings/SearchRoomItemType";

interface ISearchRoomItemsProps {
  roomResults: SearchRoomItemType[];
  isRoomSearching: boolean;
  closeHandler: () => void;
}

const SearchRoomItems: FC<ISearchRoomItemsProps> = ({
  roomResults,
  isRoomSearching,
  closeHandler,
}) => {
  return (
    <SearchRoomItemsContainer roomResults={roomResults}>
      {isRoomSearching ? (
        <Icon>
          <CgSpinnerTwo />
        </Icon>
      ) : roomResults.length ? (
        <>
          {roomResults.map((result) => (
            <SearchRoomItem
              key={result.id}
              {...result}
              closeHandler={closeHandler}
            />
          ))}
        </>
      ) : (
        <SearchRoomIntroImageContainer>
          <img src={FindImage} />
          <Description>No results found...</Description>
        </SearchRoomIntroImageContainer>
      )}
    </SearchRoomItemsContainer>
  );
};

export default SearchRoomItems;

const SearchRoomItemsContainer = styled.div<{
  roomResults: SearchRoomItemType[];
}>`
  ${tw`
    mt-4
    py-3
    w-full
    grid
    place-items-center
  `}

  ${({ roomResults }) =>
    roomResults.length &&
    tw`
      grid-cols-2
      gap-3
    `}
`;

const SearchRoomIntroImageContainer = styled.div`
  ${tw`
    flex
    flex-col
    justify-center
  `}

  img {
    ${tw`
      h-16
      mb-1
    `}
  }
`;

const Icon = styled.span`
  ${tw`
    text-4xl
    text-green-400
  `}

  svg {
    ${tw`
      animate-spin
    `}
  }
`;

const Description = styled.p`
  ${tw`
    text-sm
    text-gray-400
  `}
`;
