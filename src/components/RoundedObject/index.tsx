import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IRoundedObject {
  icon?: any;
  clickHandler?: () => void;
}

const RoundedObject: FC<IRoundedObject> = ({ icon, clickHandler }) => {
  return (
    <RoundedObjectContainer>
      <Icon>{icon}</Icon>
    </RoundedObjectContainer>
  );
};

export default RoundedObject;

const RoundedObjectContainer = styled.div`
  ${tw`
    p-4
    mb-2
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
  `}

  border-radius: 50px;
  background-color: #36393f;

  &:hover {
    background-color: #3ba55d;

    span {
      color: white;
    }
  }
`;

const Icon = styled.span`
  ${tw`
    text-lg
  `}

  color: #3ba55d;
`;
