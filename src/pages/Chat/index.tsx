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
  const [joinedRoomIds, setJoinedRoomIds] = useState<string[]>([]);
  const [joinedMemberIds, setJoinedMemberIds] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>();
  const [roomMembers, setRoomMembers] = useState<MemberItemType[]>([]);

  const { user } = useAuth();
  const { rooms, setRooms } = useRooms();

  const { id } = queryString.parse(location.search);

  const getJoinedRoomIds = () => {
    if (user) {
      db.collectionGroup("members")
        .where("uid", "==", user.uid)
        .onSnapshot((snapshot) => {
          const roomIds = snapshot.docs.map((doc) => doc.ref.parent.parent?.id);

          setJoinedRoomIds(roomIds as string[]);
        });
    }
  };

  const getJoinedRooms = () => {
    if (joinedRoomIds.length) {
      db.collection("rooms")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const joinedRooms = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              oid: doc.data().oid,
              timestamp: doc.data().timestamp,
              name: doc.data().name,
              background: doc.data().background,
            }))
            .filter((room) => joinedRoomIds.includes(room.id));

          setRooms(joinedRooms);
        });
    }
  };

  const getSelectedRoom = () => {
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

  const getMemberIdsOfSelectedRoom = () => {
    db.collection("rooms")
      .doc(selectedRoom?.id)
      .collection("members")
      .onSnapshot((snapshot) => {
        const memberIds = snapshot.docs.map((doc) => doc.data().uid);

        setJoinedMemberIds(memberIds as any);
      });
  };

  const getMembersOfSelectedRoom = () => {
    db.collection("users").onSnapshot((snapshot) => {
      const joinedRoomMembers = snapshot.docs
        .map((doc) => ({
          uid: doc.data().uid,
          username: doc.data().username,
          avatar: doc.data().avatar,
        }))
        .filter((member) => joinedMemberIds.includes(member.uid));
      const owner = joinedRoomMembers
        .filter((member) => member.uid === selectedRoom?.oid)
        .map((member) => ({ ...member, oid: selectedRoom?.oid }));
      const normalMembers = joinedRoomMembers.filter(
        (member) => member.uid !== selectedRoom?.oid
      );

      setRoomMembers([...owner, ...normalMembers]);
    });
  };

  useEffect(() => {
    getJoinedRoomIds();
    checkUserHandler();
  }, []);

  useEffect(() => {
    getJoinedRooms();
  }, [joinedRoomIds]);

  useEffect(() => {
    if (rooms?.length) getSelectedRoom();
  }, [rooms, id]);

  useEffect(() => {
    getMemberIdsOfSelectedRoom();
  }, [selectedRoom]);

  useEffect(() => {
    getMembersOfSelectedRoom();
  }, [joinedMemberIds]);

  return (
    <ChatContainer>
      <FeaturesListContainer>
        <FeaturesList joinedRoomIds={joinedRoomIds} />
      </FeaturesListContainer>

      <RoomOptionContainer>
        <RoomHeader
          selectedRoom={selectedRoom}
          isBlank={!selectedRoom ? true : false}
        />

        {selectedRoom ? (
          <OptionsList roomMembers={roomMembers} />
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
