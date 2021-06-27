import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { OptionType } from "../../typings/OptionType";
import { RoomType } from "../../typings/RoomType";
import RoomItem from "../RoomItem";

interface IChosenOptionProps extends OptionType {
  rooms: RoomType[];
  chosenId: string;
  clickHandler: (id: string) => void;
}

const ChosenOption: FC<IChosenOptionProps> = ({
  rooms,
  chosenId,
  option,
  clickHandler,
}) => {
  return (
    <ChosenOptionContainer>
      {option === "rooms"
        ? rooms.map((room) => (
            <RoomItem
              key={room.id}
              {...room}
              chosenId={chosenId}
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
