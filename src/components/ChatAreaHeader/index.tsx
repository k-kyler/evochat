import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaComment, FaCommentSlash, FaListUl, FaUpload } from "react-icons/fa";
import { db } from "../../firebase";

const ChatAreaHeader: FC = () => {
  return (
    <ChatAreaHeaderContainer>
      <RoomInfoContainer>
        {/* <img src={String(user?.photoURL)} /> */}
        <RoomName>kkyler's chat</RoomName>
      </RoomInfoContainer>

      <Icons>
        <Icon>
          <FaComment />
        </Icon>
        <Icon>
          <FaListUl />
        </Icon>
        <Icon>
          <FaUpload />
        </Icon>
      </Icons>
    </ChatAreaHeaderContainer>
  );
};

export default ChatAreaHeader;

const ChatAreaHeaderContainer = styled.div`
  ${tw`
    p-3
    flex
    items-center
    justify-between
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);
`;

const RoomInfoContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  img {
    border-radius: 50px;
    height: 1.6rem;
    margin-right: 1rem;
  }
`;

const RoomName = styled.p`
  ${tw`
    text-base
  `}
`;

const Icons = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
    p-1
    cursor-pointer
    text-lg
    text-gray-400
    transition-all
    duration-300
    ease-in-out
    hover:opacity-80
  `}

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
