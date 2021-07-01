import { FC, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import queryString from "query-string";
import { useAuth } from "../../contexts/AuthContext";
import { useRooms } from "../../contexts/RoomsContext";
import FeaturesList from "../../components/FeaturesList";
import OptionsList from "../../components/OptionsList";
import UserSection from "../../components/UserSection";
import RoomHeader from "../../components/RoomHeader";
import Messages from "../../components/Messages";
import { db } from "../../firebase";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const { user } = useAuth();
  const { setRooms } = useRooms();

  const { id } = queryString.parse(location.search);

  const getRooms = () => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => {
            if (user?.uid === doc.data().uid)
              return {
                id: doc.id,
                name: doc.data().name,
                background: doc.data().background,
              };
          })
        );
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <ChatContainer>
      <FeaturesList />

      <RoomOptionContainer>
        <RoomHeader id={id} />
        <OptionsList />
        <UserSection />
      </RoomOptionContainer>

      <ChatAreaContainer>
        <Messages />
      </ChatAreaContainer>
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

const RoomOptionContainer = styled.div`
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
    flex
    flex-col
  `}

  background-color: #36393f;
  flex: 0.8;
`;
