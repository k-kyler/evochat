import { FC, useRef, useState, Dispatch, useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FaSearch, FaSignInAlt } from "react-icons/fa";
import RoomInput from "../Input/RoomInput";
import Button from "../Button";
import SearchRoomItems from "../SearchRoomItems";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { useAuth } from "../../contexts/AuthContext";
import { SearchRoomItemType } from "../../typings/SearchRoomItemType";
import { useRooms } from "../../contexts/RoomsContext";

interface IModalProps {
  title?: string;
  description?: string;
  type:
    | "create-room"
    | "search-room"
    | "edit-room-name"
    | "edit-room-bg"
    | "room-info"
    | "user-setting"
    | "zoom-image"
    | "member-info";
  open: boolean;
  closeHandler: () => void;
  setOpenSearchRoomModal?: Dispatch<boolean>;
  setOpenCreateNewRoomModal?: Dispatch<boolean>;
  defaultInput?: string;
  imageSrc?: string;
}

const Modal: FC<IModalProps> = ({
  title,
  description,
  type,
  open,
  closeHandler,
  setOpenSearchRoomModal,
  setOpenCreateNewRoomModal,
  defaultInput,
  imageSrc,
}) => {
  const [inputRoomBackground, setInputRoomBackground] = useState<any>(null);

  const [disabledCreateRoomButton, setDisabledCreateRoomButton] =
    useState(false);
  const [disabledSearchRoomButton, setDisabledSearchRoomButton] =
    useState(false);
  const [disabledChangeRoomNameButton, setDisabledChangeRoomNameButton] =
    useState(false);

  const [checkInputRoomName, setCheckInputRoomName] = useState(false);
  const [checkUploadBackground, setCheckUploadBackground] = useState(false);
  const [checkInputSearchRoomName, setCheckInputSearchRoomName] =
    useState(false);

  const [roomResults, setRoomResults] = useState<SearchRoomItemType[]>([]);
  const [isRoomSearching, setIsRoomSearching] = useState(false);

  const inputRoomNameRef = useRef<HTMLInputElement>(null);
  const inputRoomBackgroundRef = useRef<HTMLInputElement>(null);
  const inputSearchRoomNameRef = useRef<HTMLInputElement>(null);
  const inputChangeRoomNameRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { rooms } = useRooms();

  const createNewRoomHandler = () => {
    setDisabledCreateRoomButton(true);

    setTimeout(() => {
      if (inputRoomNameRef.current) {
        const roomName = inputRoomNameRef.current.value;

        if (roomName) {
          setCheckInputRoomName(false);

          // Check if file size larger than 10 MB
          if (
            inputRoomBackground &&
            inputRoomBackground.size > 10 * 1024 * 1024
          ) {
            setCheckUploadBackground(true);
          }

          // Add new room
          else {
            db.collection("rooms")
              .add({
                oid: user?.uid,
                name: roomName,
                background: "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then((docRef) => {
                // Add new member to members subcollection of rooms collection
                db.collection("rooms")
                  .doc(docRef.id)
                  .collection("members")
                  .add({
                    uid: user?.uid,
                    timestamp: new Date(),
                  });

                if (inputRoomBackground) {
                  // Upload room background handler
                  const storageRef = storage.ref();
                  const roomBackgroundPath = `room-background/${docRef.id}/${
                    docRef.id +
                    "." +
                    inputRoomBackground.name.split(".")[
                      inputRoomBackground.name.split(".").length - 1
                    ]
                  }`;
                  const roomBackgroundRef =
                    storageRef.child(roomBackgroundPath);

                  roomBackgroundRef.put(inputRoomBackground).then(() => {
                    // Retrieve the downloaded URL of room background
                    storage
                      .ref(roomBackgroundPath)
                      .getDownloadURL()
                      .then((url) => {
                        // Update the room background URL
                        docRef.update({
                          background: url,
                        });
                      })
                      .then(() => {
                        // Refresh input room background state
                        setInputRoomBackground(null);
                      });
                  });
                }
              })
              .catch((error) => console.error(error));

            // Close create new room modal
            setDisabledCreateRoomButton(false);
            closeHandler();
          }
        } else {
          if (inputRoomNameRef.current) inputRoomNameRef.current.focus();

          setCheckInputRoomName(true);

          setTimeout(() => {
            setCheckInputRoomName(false);
          }, 3000);
        }

        setDisabledCreateRoomButton(false);
      }
    }, 1500);
  };

  const switchToSearchRoomModal = () => {
    closeHandler();
    if (setOpenSearchRoomModal) setOpenSearchRoomModal(true);
  };

  const switchToCreateRoomModal = () => {
    closeHandler();
    if (setOpenCreateNewRoomModal) setOpenCreateNewRoomModal(true);
  };

  const searchRoomHandler = () => {
    if (inputSearchRoomNameRef.current) {
      if (inputSearchRoomNameRef.current.value) {
        setDisabledSearchRoomButton(true);
        setIsRoomSearching(true);
        setRoomResults([]);

        db.collection("rooms")
          .get()
          .then((snapshot) => {
            const searchResults = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                background: doc.data().background,
                name: doc.data().name,
              }))
              .filter((room) =>
                room.name
                  .toLowerCase()
                  .includes(inputSearchRoomNameRef.current?.value.toLowerCase())
              );
            const joinedRoomIds = rooms?.map((room) => room.id);
            const results = searchResults.map((room) => ({
              id: room.id,
              background: room.background,
              name: room.name,
              isJoined: joinedRoomIds?.includes(room.id) ? true : false,
            }));

            setRoomResults(results);
          })
          .then(() => {
            setDisabledSearchRoomButton(false);
            setIsRoomSearching(false);
          });
      } else {
        inputSearchRoomNameRef.current.focus();
        setCheckInputSearchRoomName(true);

        setTimeout(() => {
          setCheckInputSearchRoomName(false);
        }, 3000);
      }
    }
  };

  const changeRoomNameHandler = () => {
    setDisabledChangeRoomNameButton(true);
  };

  useEffect(() => {
    setRoomResults([]);
  }, [open]);

  if (!open) return null;
  return createPortal(
    <>
      <ModalOverlay onClick={closeHandler} />

      <ModalContent isImage={type}>
        <ModalInnerContent isImage={type}>
          {type === "zoom-image" ? null : (
            <ModalHeader>
              <CloseModalButton onClick={closeHandler}>
                &times;
              </CloseModalButton>
            </ModalHeader>
          )}

          <ModalBody>
            {/* Modal title */}
            {type === "zoom-image" ? null : (
              <>
                <ModalTitle>{title}</ModalTitle>
                <ModalDescription>{description}</ModalDescription>
              </>
            )}
            {/* End of modal title */}

            {/* Modal feature */}
            <ModalFeature isImage={type}>
              {type === "create-room" ? (
                <RoomFeature
                  checkInputRoomName={checkInputRoomName}
                  type="create"
                >
                  <RoomInput
                    type="room-upload-background"
                    refValue={inputRoomBackgroundRef}
                    setInputRoomBackground={setInputRoomBackground}
                    checkUploadBackground={checkUploadBackground}
                    setCheckUploadBackground={setCheckUploadBackground}
                  />
                  <RoomInput
                    label="Room name"
                    type="room-text-label"
                    refValue={inputRoomNameRef}
                  />
                </RoomFeature>
              ) : type === "search-room" ? (
                <RoomFeature
                  checkInputSearchRoomName={checkInputSearchRoomName}
                  type="search"
                >
                  <RoomInput
                    type="room-text"
                    refValue={inputSearchRoomNameRef}
                    placeholder="Enter room name..."
                  />
                  <SearchRoomItems
                    roomResults={roomResults}
                    isRoomSearching={isRoomSearching}
                    closeHandler={closeHandler}
                  />
                </RoomFeature>
              ) : type === "edit-room-name" ? (
                <RoomFeature>
                  <RoomInput
                    type="room-text"
                    refValue={inputChangeRoomNameRef}
                    defaultValue={defaultInput}
                  />
                </RoomFeature>
              ) : type === "zoom-image" ? (
                <RoomFeature>
                  <img src={imageSrc} />
                </RoomFeature>
              ) : null}
            </ModalFeature>
            {/* End of modal title */}
          </ModalBody>
        </ModalInnerContent>

        {/* Modal actions */}
        <ModalActions isImage={type}>
          {type === "create-room" ? (
            <RoomButtons>
              <Button
                content="Search room"
                theme="text-icon"
                color="dark"
                icon={<FaSearch />}
                clickHandler={switchToSearchRoomModal}
              />
              <Button
                content="Create"
                theme="loading-filled-no-outlined"
                color="blue"
                clickHandler={createNewRoomHandler}
                disabled={disabledCreateRoomButton}
              />
            </RoomButtons>
          ) : type === "search-room" ? (
            <RoomButtons>
              <Button
                content="Create room"
                theme="text-icon"
                color="dark"
                icon={<FaSignInAlt />}
                clickHandler={switchToCreateRoomModal}
              />
              <Button
                content="Search"
                theme="filled-no-outlined"
                color="blue"
                clickHandler={searchRoomHandler}
                disabled={disabledSearchRoomButton}
              />
            </RoomButtons>
          ) : type === "edit-room-name" ? (
            <RoomButtons isOne={true}>
              <Button
                content="Update"
                theme="loading-filled-no-outlined"
                color="blue"
                clickHandler={changeRoomNameHandler}
                disabled={disabledChangeRoomNameButton}
              />
            </RoomButtons>
          ) : null}
        </ModalActions>
        {/* End of modal actions */}

        {/* zoom image modal */}
        {type === "zoom-image" ? (
          <OriginalImageLink target="__blank" href={imageSrc}>
            Open in original
          </OriginalImageLink>
        ) : null}
        {/* End of zoom image modal */}
      </ModalContent>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;

const ModalOverlay = styled.div`
  ${tw`
    fixed
    top-0
    left-0
    right-0
    bottom-0
  `}

  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div<{ isImage?: string }>`
  ${tw`
    bg-white
    shadow-lg
    rounded-md
    fixed
    top-1/2
    left-1/2
  `}

  ${({ isImage }) =>
    isImage === "zoom-image"
      ? tw`
        max-w-md
      `
      : tw`w-2/5`}

  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ModalInnerContent = styled.div<{ isImage?: string }>`
  ${({ isImage }) => (isImage === "zoom-image" ? tw`p-0` : tw`p-4`)}
`;

const ModalHeader = styled.div`
  ${tw`
    flex
    items-center
    justify-end
  `}
`;

const CloseModalButton = styled.span`
  ${tw`
    pt-4
    cursor-pointer
    text-3xl
    text-gray-400
    transition-all
    duration-300
    ease-in-out
    absolute
    hover:text-gray-700
  `}
`;

const ModalBody = styled.div`
  ${tw`
    flex
    flex-col
    items-center
  `}
`;

const ModalTitle = styled.h3`
  ${tw`
    text-center
    text-2xl
    capitalize    
    mt-1
    mb-2
    select-none
    pointer-events-none
  `}
`;

const ModalDescription = styled.p`
  ${tw`
    text-center
    text-sm
    text-gray-500
    pointer-events-none
    select-none
  `}

  width: 26em;
`;

const ModalFeature = styled.div<{ isImage?: string }>`
  ${tw`
    select-none
    w-full
  `}

  ${({ isImage }) => (isImage === "zoom-image" ? tw`mt-0` : tw`mt-3`)}
`;

const ModalActions = styled.div<{ isImage?: string }>`
  ${tw`
    bg-gray-100
    px-4
    py-3
  `}

  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  ${({ isImage }) =>
    isImage === "zoom-image" &&
    css`
      display: none;
    `}
`;

const RoomFeature = styled.div<{
  checkInputRoomName?: boolean;
  checkInputSearchRoomName?: boolean;
  type?: "create" | "search" | "image";
}>`
  ${tw`
    flex
    flex-col
    items-center
  `}

  ${({ type, checkInputRoomName, checkInputSearchRoomName }) =>
    type === "create"
      ? css`
          div {
            ${tw`
              my-2
            `}
          }

          input:nth-child(2) {
            ${checkInputRoomName && tw`border-red-500`}
          }
        `
      : type === "search"
      ? css`
          input:nth-child(1) {
            ${checkInputSearchRoomName && tw`border-red-500`}
          }
        `
      : null}
`;

const RoomButtons = styled.div<{ isOne?: boolean }>`
  ${tw`
    flex
    items-center
    w-full
  `}

  ${({ isOne }) => (isOne ? tw`justify-end` : tw`justify-between`)}
`;

const OriginalImageLink = styled.a`
  ${tw`
    absolute
    mt-1
    transition-all
    duration-300
    ease-in-out
    text-sm
    text-gray-400
    hover:text-white
    hover:underline
  `}
`;
