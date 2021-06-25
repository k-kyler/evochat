import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../../assets/web-logo.svg";
import { Link } from "react-router-dom";
import RoundedObject from "../../components/RoundedObject";
import { FaPlus, FaUserFriends, FaBell } from "react-icons/fa";

const Chat: FC = () => {
  return (
    <ChatContainer>
      <ListRoomsContainer>
        <Link to="/">
          <img src={Logo} />
        </Link>

        <LineBreak />

        <RoundedObject icon={<FaBell />} />
        <RoundedObject icon={<FaUserFriends />} />
        <RoundedObject icon={<FaPlus />} />
      </ListRoomsContainer>

      <RoomOptionsContainer>Room overview</RoomOptionsContainer>

      <ChatAreaContainer>Chat area</ChatAreaContainer>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
  `}
`;

const ListRoomsContainer = styled.div`
  ${tw`
  text-white
    p-3
    flex
    flex-col
  `}

  background-color: #202225;

  img {
    height: 3rem;
  }
`;

const LineBreak = styled.div`
  ${tw`
    bg-gray-500
    my-3
  `}

  height: 0.1rem;
`;

const RoomOptionsContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #2f3136;
  flex: 0.2;
`;

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #36393f;
  flex: 0.8;
`;
