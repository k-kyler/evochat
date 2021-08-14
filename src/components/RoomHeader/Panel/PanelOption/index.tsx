import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PanelOptionType } from "../../../../typings/PanelOptionType";

interface IPanelOptionProps extends PanelOptionType {}

const PanelOption: FC<IPanelOptionProps> = ({
  name,
  icon,
  highlight,
  bottomDivider,
  clickHandler,
}) => {
  return (
    <>
      <PanelOptionContainer onClick={clickHandler && clickHandler}>
        <PanelOptionName highlight={highlight}>{name}</PanelOptionName>
        <PanelOptionIcon>{icon}</PanelOptionIcon>
      </PanelOptionContainer>
      {bottomDivider && <Divider />}
    </>
  );
};

export default PanelOption;

const PanelOptionContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
    my-2
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
    font-semibold
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

const Divider = styled.div`
  ${tw`
    my-2
  `}

  background-color: rgba(255, 255, 255, 0.1);
  height: 0.1px;
`;
