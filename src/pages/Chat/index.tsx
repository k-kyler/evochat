import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import queryString from "query-string";
import { useOption } from "../../contexts/OptionContext";
import ListOptions from "../../components/ListOptions";
import ChosenOption from "../../components/ChosenOption";
import UserSection from "../../components/UserSection";
import OptionHeader from "../../components/OptionHeader";
import { RoomType } from "../../typings/RoomType";
import { db } from "../../firebase";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [chosenRoomId, setChosenRoomId] = useState("");
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const { setOption } = useOption();

  const { opt } = queryString.parse(location.search);

  const chosenRoomIdHandler = (id: string) => setChosenRoomId(id);

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
    if (rooms?.length) setChosenRoomId(rooms[0].id);
    setOption("rooms");
    if (opt) setOption(opt);
  }, [location.search, rooms]);

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <ChatContainer>
      <ListOptions />

      <CurrentOptionContainer>
        <OptionHeader rooms={rooms} />

        <ChosenOption
          rooms={rooms}
          chosenRoomId={chosenRoomId}
          clickHandler={chosenRoomIdHandler}
        />

        <UserSection />
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

const ChatAreaContainer = styled.div`
  ${tw`
    text-white
  `}

  background-color: #36393f;
  flex: 0.8;
`;
