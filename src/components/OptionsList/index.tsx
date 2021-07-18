import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { MemberItemType } from "../../typings/MemberItemType";
import OptionGroup from "./OptionGroup";

interface IOptionsListProps {
  roomAllMembers?: MemberItemType[];
}

const OptionsList: FC<IOptionsListProps> = ({ roomAllMembers }) => {
  return (
    <OptionsListContainer>
      <OptionGroup
        type="members"
        name="Room members"
        members={roomAllMembers}
      />
      <OptionGroup type="media" name="Shared media" />
      <OptionGroup type="files" name="Shared files" />
    </OptionsListContainer>
  );
};

export default OptionsList;

const OptionsListContainer = styled.div`
  ${tw`
    flex-1
    py-2
    overflow-y-auto
  `}

  scroll-behavior: smooth;

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #2f3136;
    border-top: 1px solid rgba(4, 4, 5, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-600
      rounded-lg
    `}
  }

  /* Firefox */
  scrollbar-width: auto;
  scrollbar-color: #4b5563 #2f3136;
`;
