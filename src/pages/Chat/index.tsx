import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import queryString from "query-string";
import { useAuth } from "../../contexts/AuthContext";
import ListOptions from "../../components/ListOptions";
import ChosenOption from "../../components/ChosenOption";
import UserSection from "../../components/UserSection";
import { RoomType } from "../../typings/RoomType";
import { db } from "../../firebase";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [option, setOption] = useState<string | string[] | null>("");
  const [chosenId, setChosenId] = useState("");
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const { user } = useAuth();

  const { opt } = queryString.parse(location.search);

  const chosenRoomHandler = (id: string) => setChosenId(id);

  const getRooms = () => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        );
      });
  };

  useEffect(() => {
    if (rooms?.length) setChosenId(rooms[0].id);
    setOption("rooms");
    if (opt) setOption(opt);
  }, [location.search]);

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <ChatContainer>
      <ListOptions option={option} />

      <CurrentOptionContainer>
        <OptionNameContainer>
          <OptionName>{option}</OptionName>
        </OptionNameContainer>

        <ChosenOption
          rooms={rooms}
          chosenId={chosenId}
          option={option}
          clickHandler={chosenRoomHandler}
        />

        <UserSection user={user} />
      </CurrentOptionContainer>

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

const CurrentOptionContainer = styled.div`
  ${tw`
    text-white
    flex
    flex-col
  `}

  background-color: #2f3136;
  flex: 0.2;
`;

const OptionNameContainer = styled.div`
  ${tw`
    p-3
  `}

  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05), 0 2px 0 rgba(4, 4, 5, 0.05);
`;

const OptionName = styled.p`
  ${tw`
    text-base
    capitalize
  `}
`;

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #36393f;
  flex: 0.8;
`;
