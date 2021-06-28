import { FC, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchBar from "../SearchBar";
import { useOption } from "../../contexts/OptionContext";

interface IOptionHeaderProps {
  rooms: RoomType[];
}

const OptionHeader: FC<IOptionHeaderProps> = ({ rooms }) => {
  const [searchMode, setSearchMode] = useState(false);

  const { option } = useOption();

  return (
    <OptionHeaderContainer>
      {searchMode ? (
        <>
          <SearchBar />
          <Icon onClick={() => setSearchMode(!searchMode)}>
            <FaTimes />
          </Icon>
        </>
      ) : (
        <>
          <OptionName>{option}</OptionName>
          <Icon onClick={() => setSearchMode(!searchMode)}>
            <FaSearch />
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
    text-base
    transition-all
    duration-300
    ease-in-out
    text-gray-400
    hover:opacity-80
  `}
`;
