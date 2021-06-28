import { FC, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useRooms } from "../../contexts/RoomsContext";

const SearchBar: FC = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const { rooms } = useRooms();

  return (
    <SearchBarContainer>
      <Input
        autoFocus
        autoComplete="off"
        spellCheck="false"
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  ${tw`
    w-full
    ml-2
  `}
`;

const Input = styled.input`
  ${tw`
    w-full
    h-4
    text-base
    outline-none
    border-none
  `}

  background-color: #2f3136;
`;
