import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import BlankOptionsListImage from "../../../assets/blank-options-list.svg";

const BlankOptionsList: FC = () => {
  return (
    <BlankOptionContainersList>
      <InnerContainer>
        <img src={BlankOptionsListImage} />
        <Description>
          You haven't joined any rooms yet, let find and join one or create your
          own.
        </Description>
      </InnerContainer>
    </BlankOptionContainersList>
  );
};

export default BlankOptionsList;

const BlankOptionContainersList = styled.div`
  ${tw`
    flex-1
    grid
    place-items-center
    mx-3
  `}
`;

const InnerContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}

  img {
    ${tw`
      h-16
      mb-3
    `}
  }
`;

const Description = styled.p`
  ${tw`
    text-gray-400
    text-sm
    text-center
    leading-6
    select-none
    pointer-events-none
  `}
`;
