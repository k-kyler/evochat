import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { MemberItemType } from "../../typings/MemberItemType";
import { RequestItemType } from "../../typings/RequestItemType";
import { SharedMediaType, SharedFileType } from "../../typings/SharedType";
import OptionGroup from "./OptionGroup";

interface IOptionsListProps {
  roomMembers: MemberItemType[];
  roomMedia: SharedMediaType[];
  roomFiles: SharedFileType[];
  roomRequests?: RequestItemType[];
  isOwner: boolean;
}

const OptionsList: FC<IOptionsListProps> = ({
  roomMembers,
  roomMedia,
  roomFiles,
  roomRequests,
  isOwner,
}) => {
  return (
    <OptionsListContainer>
      {isOwner ? (
        <OptionGroup type="requests" name="Requests" requests={roomRequests} />
      ) : null}
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
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #202225;
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-600
      rounded-lg
    `}
  }

  /* Firefox */
  scrollbar-width: auto;
  scrollbar-color: #4b5563 #202225;
`;
