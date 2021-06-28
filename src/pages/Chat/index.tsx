import { FC, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import queryString from "query-string";
import { useOption } from "../../contexts/OptionContext";
import { useRooms } from "../../contexts/RoomsContext";
import ListOptions from "../../components/ListOptions";
import ChosenOption from "../../components/ChosenOption";
import UserSection from "../../components/UserSection";
import OptionHeader from "../../components/OptionHeader";
import { db } from "../../firebase";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const { setOption } = useOption();
  const { setRooms } = useRooms();

  const { opt } = queryString.parse(location.search);

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
    setOption("rooms");
    if (opt) setOption(opt);
  }, [location.search]);

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <ChatContainer>
      <ListOptions />

      <CurrentOptionContainer>
        <OptionHeader />
        <ChosenOption />
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
