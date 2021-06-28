import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import RoomItem from "../RoomItem";
import { useOption } from "../../contexts/OptionContext";

interface IChosenOptionProps {
  rooms: RoomType[];
  chosenRoomId: string;
  clickHandler: (id: string) => void;
}

const ChosenOption: FC<IChosenOptionProps> = ({
  rooms,
  chosenRoomId,
  clickHandler,
}) => {
  const { option } = useOption();

  return (
    <ChosenOptionContainer>
      {option === "rooms"
        ? rooms.map((room) => (
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
