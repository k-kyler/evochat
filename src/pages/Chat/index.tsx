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
import PageLoading from "../../components/PageLoading";
import { RoomType } from "../../typings/RoomType";
import { MemberItemType } from "../../typings/MemberItemType";
import { SharedMediaType, SharedFileType } from "../../typings/SharedType";
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
  const [roomBlockMessagesIds, setRoomBlockMessagesIds] = useState<string[]>(
    []
  );
  const [roomMedia, setRoomMedia] = useState<SharedMediaType[]>([]);
  const [roomFiles, setRoomFiles] = useState<SharedFileType[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { user } = useAuth();
  const { rooms, setRooms } = useRooms();

  const { id } = queryString.parse(location.search);

  const getJoinedRoomIds = () => {
    if (user) {
      db.collectionGroup("members")
        .where("uid", "==", user.uid)
        .orderBy("timestamp", "desc")
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
    if (user) {
      db.collection("users").onSnapshot((snapshot) => {
        const existedUser = snapshot.docs.filter(
          (doc) => doc.data().uid === user.uid
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
    }
  };

  const getMemberIdsOfSelectedRoom = () => {
    if (selectedRoom) {
      db.collection("rooms")
        .doc(selectedRoom.id)
        .collection("members")
        .onSnapshot((snapshot) => {
          const memberIds = snapshot.docs.map((doc) => doc.data().uid);

          setJoinedMemberIds(memberIds as any);
        });
    }
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

  const getRoomBlockMessagesIds = () => {
    if (selectedRoom) {
      db.collection("roomMessages")
        .where("roomId", "==", selectedRoom.id)
        .onSnapshot((snapshot) => {
          const blockMessagesIds = snapshot.docs.map((doc) => doc.id);

          setRoomBlockMessagesIds(blockMessagesIds as string[]);
        });
    }
  };

  const getMediaOfSelectedRoom = () => {
    db.collectionGroup("dateMessages")
      .where("type", "in", ["image", "video"])
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const sharedMedia = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            media: doc.data().media,
            type: doc.data().type,
            roomId: doc.ref.parent.parent?.id as string,
          }))
          .filter((media) => roomBlockMessagesIds.includes(media.roomId));

        setRoomMedia(sharedMedia);
      });
  };

  const getFilesOfSelectedRoom = () => {
    db.collectionGroup("dateMessages")
      .where("type", "==", "file")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const sharedFiles = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            file: doc.data().file,
            fileName: doc.data().fileName,
            roomId: doc.ref.parent.parent?.id as string,
          }))
          .filter((media) => roomBlockMessagesIds.includes(media.roomId));

        setRoomFiles(sharedFiles);
      });
  };

  const pageLoadingHandler = () => {
    if (joinedRoomIds.length) setIsPageLoading(false);
    else
      setTimeout(() => {
        setIsPageLoading(false);
      }, 2000);
  };

  useEffect(() => {
    checkUserHandler();
    getJoinedRoomIds();
  }, []);

  useEffect(() => {
    getJoinedRooms();
    pageLoadingHandler();
  }, [joinedRoomIds]);

  useEffect(() => {
    if (rooms?.length) getSelectedRoom();
  }, [rooms, id]);

  useEffect(() => {
    getMemberIdsOfSelectedRoom();
    getRoomBlockMessagesIds();
  }, [selectedRoom]);

  useEffect(() => {
    getMembersOfSelectedRoom();
  }, [joinedMemberIds]);

  useEffect(() => {
    getMediaOfSelectedRoom();
    getFilesOfSelectedRoom();
  }, [roomBlockMessagesIds]);

  return (
    <ChatContainer>
      {isPageLoading ? (
        <PageLoading />
      ) : (
        <>
          <FeaturesListContainer>
            <FeaturesList joinedRoomIds={joinedRoomIds} />
          </FeaturesListContainer>

          <RoomOptionContainer>
            <RoomHeader
              selectedRoom={selectedRoom}
              isBlank={!joinedRoomIds.length ? true : false}
            />

            {joinedRoomIds.length ? (
              <OptionsList
                roomMembers={roomMembers}
                roomMedia={roomMedia}
                roomFiles={roomFiles}
              />
            ) : (
              <BlankOptionsList />
            )}

            <UserSection />
          </RoomOptionContainer>

          <ChatAreaContainer>
            {joinedRoomIds.length ? (
              <Messages selectedRoom={selectedRoom} />
            ) : (
              <BlankChatArea />
            )}
          </ChatAreaContainer>
        </>
      )}
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
