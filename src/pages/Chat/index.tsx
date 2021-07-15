import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import queryString from "query-string";
import { useAuth } from "../../contexts/AuthContext";
import { useRooms } from "../../contexts/RoomsContext";
import { useUsers } from "../../contexts/UsersContext";
import FeaturesList from "../../components/FeaturesList";
import OptionsList from "../../components/OptionsList";
import UserSection from "../../components/UserSection";
import RoomHeader from "../../components/RoomHeader";
import Messages from "../../components/Messages";
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
  const [allRooms, setAllRooms] = useState<RoomType[]>([]);
  const [roomMembers, setRoomMembers] = useState<MemberItemType[]>([]);

  const { user } = useAuth();
  const { rooms, setRooms } = useRooms();
  const { users, setUsers } = useUsers();

  const { id } = queryString.parse(location.search);

  const getAllRoomsHandler = () => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setAllRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            oid: doc.data().oid,
            name: doc.data().name,
            background: doc.data().background,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  };

  const getAllUsersHandler = () => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          uid: doc.data().uid,
          username: doc.data().username,
          avatar: doc.data().avatar,
          email: doc.data().email,
        }))
      );
    });
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

  const getMembersOfSelectedRoom = () => {
    const owner = users?.map((user) => {
      if (user.uid === selectedRoom?.oid) {
        return {
          username: user.username,
          avatar: user.avatar,
          oid: user.uid,
          uid: user.uid,
        };
      }
    });

    db.collection("rooms")
      .doc(selectedRoom?.id)
      .collection("members")
      .onSnapshot(
        (snapshot) => {
          setRoomMembers([
            ...(owner as any),
            ...snapshot.docs.map((doc) => ({
              username: users?.filter((user) => user.uid === doc.data().uid)[0]
                .username,
              avatar: users?.filter((user) => user.uid === doc.data().uid)[0]
                .avatar,
              uid: doc.data().uid,
            })),
          ]);
        },
        (error) => {
          if (error) {
            setRoomMembers([...(owner as any)]);
          }
        }
      );
  };

  const setJoinedRooms = () => {
    const joinedRooms = allRooms?.filter(
      (room) => room.oid === user?.uid || roomMembers.includes(user?.uid as any)
    );

    if (joinedRooms?.length) setRooms(joinedRooms);
  };

  useEffect(() => {
    getAllRoomsHandler();
    getAllUsersHandler();
    checkUserHandler();
  }, []);

  useEffect(() => {
    if (allRooms.length) setJoinedRooms();
  }, [allRooms]);

  useEffect(() => {
    if (rooms?.length) getSelectedRoomHandler();
  }, [rooms, id]);

  useEffect(() => {
    getMembersOfSelectedRoom();
  }, [selectedRoom]);

  return (
    <ChatContainer>
      <FeaturesListContainer>
        <FeaturesList />
      </FeaturesListContainer>

      <RoomOptionContainer>
        <RoomHeader selectedRoom={selectedRoom} />
        <OptionsList roomMembers={roomMembers} />
        <UserSection />
      </RoomOptionContainer>

      <ChatAreaContainer>
        <Messages selectedRoom={selectedRoom} />
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
    px-3
    relative
    overflow-x-hidden
    overflow-y-auto
  `}

  flex: 0.04;
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
  flex: 0.76;
`;
