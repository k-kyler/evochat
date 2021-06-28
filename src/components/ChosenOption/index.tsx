import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RoomItem from "../RoomItem";
import { useOption } from "../../contexts/OptionContext";
import { useRooms } from "../../contexts/RoomsContext";

const ChosenOption: FC = () => {
  const [chosenRoomId, setChosenRoomId] = useState("");

  const { option } = useOption();
  const { rooms } = useRooms();

  useEffect(() => {
    if (rooms?.length) setChosenRoomId(rooms[0].id);
  }, [rooms]);

  return (
    <ChosenOptionContainer>
      {option === "rooms"
        ? rooms?.map((room: any) => (
            <RoomItem
              key={room.id}
              {...room}
              chosenRoomId={chosenRoomId}
              clickHandler={() => setChosenRoomId(room.id)}
            />
          ))
        : null}
    </ChosenOptionContainer>
  );
};

export default ChosenOption;

const ChosenOptionContainer = styled.div`
  ${tw`
    flex-1
    px-3
    py-4
  `}
`;
