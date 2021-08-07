import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinnerTwo } from "react-icons/cg";
import SearchRoomResult from "./SearchRoomResult";
import FindImage from "../../assets/find.svg";
import { SearchRoomResultType } from "../../typings/SearchRoomResultType";

interface ISearchRoomResultsProps {
  roomResults: SearchRoomResultType[];
  isRoomSearching: boolean;
}

const SearchRoomResults: FC<ISearchRoomResultsProps> = ({
  roomResults,
  isRoomSearching,
}) => {
  return (
    <SearchRoomResultsContainer roomResults={roomResults}>
      {isRoomSearching ? (
        <Icon>
          <CgSpinnerTwo />
        </Icon>
      ) : roomResults.length ? (
        <>
          {roomResults.map((result) => (
            <SearchRoomResult key={result.id} {...result} />
          ))}
        </>
      ) : (
        <SearchRoomIntroImageContainer>
          <img src={FindImage} />
          {!roomResults.length ? (
            <Description>No results found...</Description>
          ) : null}
        </SearchRoomIntroImageContainer>
      )}
    </SearchRoomResultsContainer>
  );
};

export default SearchRoomResults;

const SearchRoomResultsContainer = styled.div<{
  roomResults: SearchRoomResultType[];
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
