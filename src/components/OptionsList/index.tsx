import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleDown } from "react-icons/fa";
import { useRooms } from "../../contexts/RoomsContext";
import OptionGroup from "../OptionGroup";

const OptionsList: FC = () => {
  return (
    <OptionsListContainer>
      <OptionGroup />
    </OptionsListContainer>
  );
};

export default OptionsList;

const OptionsListContainer = styled.div`
  ${tw`
    flex-1
    px-3
    py-4
  `}
`;
