import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RoomType } from "../../typings/RoomType";
import OptionGroup from "../OptionGroup";
import { useUsers } from "../../contexts/UsersContext";

interface IOptionsListProps {
  selectedRoom?: RoomType;
}

const OptionsList: FC<IOptionsListProps> = ({ selectedRoom }) => {
  const [roomMembers, setRoomMembers] = useState<any>([]);

  const { users } = useUsers();

  const getRoomMembersHandler = () => {
    const owner = users?.map((user) => {
      if (user.uid === selectedRoom?.oid) {
        return {
          oid: user.uid,
          uid: user.uid,
          username: user.username,
          avatar: user.avatar,
        };
      }
    });
    const members = selectedRoom?.members?.map((member) => {
      return users?.map((user) => {
        if (member.uid === user.uid) {
          return {
            uid: user.uid,
            username: user.username,
            avatar: user.avatar,
          };
        }
      });
    });

    if (owner?.length && members?.length)
      setRoomMembers([...owner, ...members]);
    if (owner?.length && !members?.length) setRoomMembers([...owner]);
  };

  useEffect(() => {
    getRoomMembersHandler();
  }, [selectedRoom]);

  return (
    <OptionsListContainer>
      <OptionGroup type="members" name="Room members" members={roomMembers} />
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

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0.47rem;
  }

  &::-webkit-scrollbar-track {
    background: #2f3136;
    border-top: 1px solid rgba(4, 4, 5, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-500
      rounded-lg
    `}
  }

  /* Firefox */
  scrollbar-width: auto;
  scrollbar-color: #6b7280 #2f3136;
`;
