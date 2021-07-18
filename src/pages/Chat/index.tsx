import { FC, useState, useEffect } from "react";
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
import BlankOptionsList from "../../components/BlankSection/BlankOptionsList";
import BlankChatArea from "../../components/BlankSection/BlankChatArea";
import { RoomType } from "../../typings/RoomType";
import { MemberItemType } from "../../typings/MemberItemType";
import { db } from "../../firebase";

interface IChatProps {
  location: {
    search: string;
  };
}

const Chat: FC<IChatProps> = ({ location }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>();
  const [roomMembers, setRoomMembers] = useState<MemberItemType[]>([]);
  const [roomOwner, setRoomOwner] = useState<MemberItemType[]>([]);
  const [roomAllMembers, setRoomAllMembers] = useState<MemberItemType[]>([]);

  const { user } = useAuth();
  const { rooms, setRooms } = useRooms();

  const { id } = queryString.parse(location.search);

  const getJoinedRoomsHandler = () => {
    if (user) {
      db.collection("rooms")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setRooms(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                oid: doc.data().oid,
                name: doc.data().name,
                background: doc.data().background,
                members: doc.data().members,
                timestamp: doc.data().timestamp,
              };
            })
          );
        });
    }
  };

  const getSelectedRoomHandler = () => {
    const room = rooms?.filter((r) => r.id === id)[0];

    setSelectedRoom(room);
  };

  const checkUserHandler = () => {
    db.collection("users").onSnapshot((snapshot) => {
      const existedUser = snapshot.docs.filter(
        (doc) => doc.data().uid === user?.uid
      );

      if (!existedUser.length) {
        db.collection("users").add({
          uid: user?.uid,
          avatar: user?.photoURL,
          email: user?.email,
          username: user?.displayName,
          timestamp: new Date(),
        });
      }
    });
  };

  const getOwnerOfSelectedRoomHandler = () => {
    if (selectedRoom) {
      db.collection("users")
        .where("uid", "==", selectedRoom.oid)
        .onSnapshot((snapshot) => {
          setRoomOwner(
            snapshot.docs.map((doc) => ({
              username: doc.data().username,
              avatar: doc.data().avatar,
              oid: selectedRoom?.oid,
              uid: doc.data().uid,
            }))
          );
        });
    }
  };

  const getMembersOfSelectedRoomHandler = () => {};

  useEffect(() => {
    getJoinedRoomsHandler();
    checkUserHandler();
  }, []);

  useEffect(() => {
    if (rooms?.length) getSelectedRoomHandler();
  }, [rooms, id]);

  useEffect(() => {
    getOwnerOfSelectedRoomHandler();
  }, [selectedRoom]);

  useEffect(() => {
    // getMembersOfSelectedRoomHandler();
  }, [roomOwner]);

  return (
    <ChatContainer>
      <FeaturesListContainer>
        <FeaturesList />
      </FeaturesListContainer>

      <RoomOptionContainer>
        <RoomHeader
          selectedRoom={selectedRoom}
          isBlank={!selectedRoom ? true : false}
        />

        {selectedRoom ? (
          <OptionsList roomAllMembers={roomAllMembers} />
        ) : (
          <BlankOptionsList />
        )}

        <UserSection />
      </RoomOptionContainer>

      <ChatAreaContainer>
        {selectedRoom ? (
          <Messages selectedRoom={selectedRoom} />
        ) : (
          <BlankChatArea />
        )}
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

const FeaturesListContainer = styled.div`
  ${tw`
  text-white
    pt-3
    px-4
    relative
    overflow-x-hidden
    overflow-y-auto
  `}

  background-color: #202225;
  scroll-behavior: smooth;

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Firefox */
  scrollbar-width: none;
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
