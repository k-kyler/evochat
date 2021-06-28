import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RoomItem from "../RoomItem";
import { useOption } from "../../contexts/OptionContext";
import { useRooms } from "../../contexts/RoomsContext";

interface IChosenOptionProps {
  chosenRoomId: string;
  clickHandler: (id: string) => void;
}

const ChosenOption: FC<IChosenOptionProps> = ({
  chosenRoomId,
  clickHandler,
}) => {
  const { option } = useOption();
  const { rooms } = useRooms();

  return (
    <ChosenOptionContainer>
      {option === "rooms"
        ? rooms?.map((room: any) => (
            <RoomItem
              key={room.id}
              {...room}
              chosenRoomId={chosenRoomId}
              clickHandler={() => clickHandler(room.id)}
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
