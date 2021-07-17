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
  const [tempUser, setTempUser] = useState<any>([]);

  const { user } = useAuth();
  const { rooms, setRooms } = useRooms();

  const { id } = queryString.parse(location.search);

  const getJoinedRoomsHandler = () => {
    db.collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => {
            if (
              doc.data().oid === user?.uid ||
              (roomMembers.length && roomMembers.includes(user?.uid as any))
            ) {
              return {
                id: doc.id,
                oid: doc.data().oid,
                name: doc.data().name,
                background: doc.data().background,
                timestamp: doc.data().timestamp,
              };
            }
          })
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
    const owner: MemberItemType =
      user?.uid === selectedRoom?.oid
        ? {
            username: user?.displayName,
            avatar: user?.photoURL,
            oid: user?.uid,
            uid: user?.uid,
          }
        : (null as any);

    db.collection("rooms")
      .doc(selectedRoom?.id)
      .collection("members")
      .onSnapshot(
        (snapshot) => {
          setRoomMembers([
            owner,
            ...snapshot.docs.map((doc) => {
              db.collection("users")
                .where("uid", "==", doc.data().uid)
                .onSnapshot((snapshot) => {
                  setTempUser(
                    snapshot.docs.map((doc) => ({
                      username: doc.data().username,
                      avatar: doc.data().avatar,
                    }))
                  );
                });

              return {
                username: tempUser[0]?.username,
                avatar: tempUser[0]?.avatar,
                uid: doc.data().uid,
              };
            }),
          ]);
        },
        (error) => {
          if (error) {
            setRoomMembers([owner]);
          }
        }
      );
  };

  useEffect(() => {
    getJoinedRoomsHandler();
    checkUserHandler();
  }, []);

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
    overflow-hidden
  `}
`;

const FeaturesListContainer = styled.div`
  ${tw`
  text-white
    pt-3
    px-4
    relative
  `}

  background-color: #202225;
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
