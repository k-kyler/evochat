import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinnerTwo } from "react-icons/cg";
import ResultItem from "./ResultItem";

interface ISearchRoomResultsProps {}

const SearchRoomResults: FC = () => {
  return (
    <SearchRoomResultsContainer>
      {/* <ResultItem /> */}
      <Icon>
        <CgSpinnerTwo />
      </Icon>
    </SearchRoomResultsContainer>
  );
};

export default SearchRoomResults;

const SearchRoomResultsContainer = styled.div`
  ${tw`
    mt-4
  `}
`;

const Icon = styled.span`
  ${tw`
    text-3xl
    text-green-400
  `}

  svg {
    ${tw`
      animate-spin
    `}
  }
`;
