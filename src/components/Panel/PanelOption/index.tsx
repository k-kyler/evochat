import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PanelOptionType } from "../../../typings/PanelOptionType";

interface IPanelOptionProps extends PanelOptionType {}

const PanelOption: FC<IPanelOptionProps> = ({
  name,
  icon,
  highlight,
  clickHandler,
}) => {
  return (
    <PanelOptionContainer>
      <PanelOptionName highlight={highlight}>{name}</PanelOptionName>
      <PanelOptionIcon>{icon}</PanelOptionIcon>
    </PanelOptionContainer>
  );
};

export default PanelOption;

const PanelOptionContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    my-1
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    hover:opacity-80
  `}
`;

const PanelOptionName = styled.p<{ highlight?: string }>`
  ${tw`
    text-xs
    text-gray-400
    capitalize
  `}

  ${({ highlight }) =>
    highlight === "blue"
      ? tw`
    text-blue-500
  `
      : highlight === "red"
      ? tw`
    text-red-500 
  `
      : null}
`;

const PanelOptionIcon = styled.span`
  ${tw`
    text-xl
  `}
`;
