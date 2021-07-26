import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { MemberItemType } from "../../typings/MemberItemType";
import { SharedMediaType, SharedFilesType } from "../../typings/Shared";
import OptionGroup from "./OptionGroup";

interface IOptionsListProps {
  roomMembers?: MemberItemType[];
  roomMedia?: SharedMediaType[];
  roomFiles?: SharedFilesType[];
}

const OptionsList: FC<IOptionsListProps> = ({
  roomMembers,
  roomMedia,
  roomFiles,
}) => {
  return (
    <OptionsListContainer>
      <OptionGroup type="members" name="Room members" members={roomMembers} />
      <OptionGroup type="media" name="Shared media" media={roomMedia} />
      <OptionGroup type="files" name="Shared files" files={roomFiles} />
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
    width: 0.4rem;
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
