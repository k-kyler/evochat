import { FC, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
// import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import SearchBar from "../SearchBar";
import { useOption } from "../../contexts/OptionContext";

const OptionHeader: FC = () => {
  const [searchMode, setSearchMode] = useState(false);

  const { option } = useOption();

  return (
    <OptionHeaderContainer>
      {searchMode ? (
        <>
          <Icon onClick={() => setSearchMode(!searchMode)}>
            <FiArrowLeft />
          </Icon>
          <SearchBar />
        </>
      ) : (
        <>
          <OptionName>{option}</OptionName>
          <Icon onClick={() => setSearchMode(!searchMode)}>
            <FiSearch />
          </Icon>
        </>
      )}
    </OptionHeaderContainer>
  );
};

export default OptionHeader;

const OptionHeaderContainer = styled.div`
  ${tw`
    p-3
    flex
    items-center
    justify-between
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);
`;

const OptionName = styled.p`
  ${tw`
    text-base
    capitalize
  `}
`;

const Icon = styled.span`
  ${tw`
    p-1
    cursor-pointer
    text-xl
    text-gray-400
    transition-all
    duration-300
    ease-in-out
    hover:opacity-80
  `}
`;
