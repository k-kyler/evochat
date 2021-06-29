import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useRooms } from "../../contexts/RoomsContext";
import { useOption } from "../../contexts/OptionContext";
import { RoomType } from "../../typings/RoomType";

const SearchBar: FC = () => {
  const [input, setInput] = useState("");
  const [tempRooms, setTempRooms] = useState<RoomType[]>();

  const { rooms, setRooms } = useRooms();
  const { option } = useOption();

  const searchHandler = () => {
    if (option === "rooms") {
      const res = rooms?.filter((room) =>
        room.name.trim().toLowerCase().includes(input.trim().toLowerCase())
      );

      setRooms(res);
    }
  };

  const inputHandler = () => {
    if (input) {
      searchHandler();
    }
    if (!input) {
      setRooms(tempRooms);
    }
  };

  useEffect(() => {
    if (rooms?.length) setTempRooms(rooms);
  }, []);

  useEffect(() => {
    if (tempRooms?.length) inputHandler();
  }, [input]);

  return (
    <SearchBarContainer>
      <Input
        autoFocus
        autoComplete="off"
        spellCheck="false"
        type="text"
        placeholder={`Search ${option}...`}
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
    ml-3
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
