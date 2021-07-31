import {
  FC,
  useRef,
  useState,
  useEffect,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  Dispatch,
} from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import {
  BiMessageDetail,
  BiGhost,
  BiImages,
  BiChevronRight,
  BiFile,
} from "react-icons/bi";
import Picker, { IEmojiData } from "emoji-picker-react";
import Tooltip from "../../Tooltip";
import Modal from "../../Modal";
import UploadingList from "./UploadingList";
import { MessageType } from "../../../typings/MessageType";
import { SharedMediaType, SharedFileType } from "../../../typings/SharedType";
import { useAuth } from "../../../contexts/AuthContext";
import { db, storage } from "../../../firebase";

interface ISendingArea {
  roomId?: string;
  blockMessagesId: string;
  inputMedia: any;
  setInputMedia: Dispatch<any>;
  inputFile: any;
  setInputFile: Dispatch<any>;
}

const SendingArea: FC<ISendingArea> = ({
  blockMessagesId,
  roomId,
  inputFile,
  inputMedia,
  setInputFile,
  setInputMedia,
}) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>();
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadingMediaPreview, setUploadingMediaPreview] =
    useState<SharedMediaType>();
  const [uploadingFilePreview, setUploadingFilePreview] =
    useState<SharedFileType>();
  const [uploadLoading, setUploadLoading] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const sendingAreaContainerRef = useRef<HTMLDivElement>(null);
  const inputMediaRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const stretchOutTextAreaHandler = () => {
    setIsOpen(!isOpen);
  };

  const textAreaOnChangeHandler = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.cssText = "height: auto";
      textAreaRef.current.style.cssText =
        "height: " + textAreaRef.current.scrollHeight + "px";
    }
  };

  const chosenEmojiHandler = (
    event: MouseEvent<Element, globalThis.MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    setChosenEmoji(emojiObject);
  };

  const sendMessageHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (user && textAreaRef.current && textAreaRef.current.value) {
        const messageObject: MessageType = {
          uid: user.uid,
          username: user.displayName as string,
          avatar: user.photoURL as string,
          message: textAreaRef.current.value,
          type: "text",
          timestamp: new Date(),
        };

        if (blockMessagesId) {
          db.collection("roomMessages")
            .doc(blockMessagesId)
            .collection("dateMessages")
            .add(messageObject);

          textAreaRef.current.value = "";
          textAreaRef.current.style.cssText = "height: auto";
        } else {
          db.collection("roomMessages")
            .add({
              roomId,
              timestamp: new Date(),
            })
            .then((docRef) => {
              if (docRef.id) {
                db.collection("roomMessages")
                  .doc(docRef.id)
                  .collection("dateMessages")
                  .add(messageObject);

                if (textAreaRef.current) {
                  textAreaRef.current.value = "";
                  textAreaRef.current.style.cssText = "height: auto";
                }
              }
            });
        }
      }
    }
  };

  const showHiddenInputMediaHandler = () => {
    if (inputMediaRef.current) inputMediaRef.current.click();
  };

  const showHiddenInputFileHandler = () => {
    if (inputFileRef.current) inputFileRef.current.click();
  };

  const inputMediaOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInputMedia(event.target.files[0]);
      setUploadingMediaPreview({
        media: URL.createObjectURL(event.target.files[0]),
        type: event.target.files[0].type.includes("video") ? "video" : "image",
      });
    }
  };

  const inputFileOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setInputFile(event.target.files[0]);
      setUploadingFilePreview({
        file: URL.createObjectURL(event.target.files[0]),
        fileName: event.target.files[0].name,
      });
    }
  };

  const uploadHandler = () => {
    setUploadLoading(true);

    const storageRef = storage.ref();

    // Single media upload handler
    if (inputMedia && user) {
      const messageObject: MessageType = {
        uid: user.uid,
        username: user.displayName as string,
        avatar: user.photoURL as string,
        type: inputMedia.type.includes("video") ? "video" : "image",
        timestamp: new Date(),
        media: "",
      };

      if (blockMessagesId) {
        db.collection("roomMessages")
          .doc(blockMessagesId)
          .collection("dateMessages")
          .add(messageObject)
          .then((docRef) => {
            const mediaPath = `shared-media/${roomId}/${
              docRef.id +
              "." +
              inputMedia.name.split(".")[inputMedia.name.split(".").length - 1]
            }`;
            const mediaRef = storageRef.child(mediaPath);

            mediaRef.put(inputMedia).then(() => {
              // Retrieve the downloaded URL of input media
              storage
                .ref(mediaPath)
                .getDownloadURL()
                .then((url) => {
                  // Update the input media URL
                  docRef.update({
                    media: url,
                  });
                })
                .then(() => {
                  // Refresh input media
                  setInputMedia(null);
                  setUploadingMediaPreview(null as any);

                  if (inputMediaRef.current) {
                    inputMediaRef.current.value = "";
                  }

                  // Refresh upload loading
                  setUploadLoading(false);
                });
            });
          });
      } else {
        db.collection("roomMessages")
          .add({
            roomId,
            timestamp: new Date(),
          })
          .then((docRef) => {
            if (docRef.id) {
              db.collection("roomMessages")
                .doc(docRef.id)
                .collection("dateMessages")
                .add(messageObject)
                .then((docRef) => {
                  const mediaPath = `shared-media/${roomId}/${
                    docRef.id +
                    "." +
                    inputMedia.name.split(".")[
                      inputMedia.name.split(".").length - 1
                    ]
                  }`;
                  const mediaRef = storageRef.child(mediaPath);

                  mediaRef.put(inputMedia).then(() => {
                    // Retrieve the downloaded URL of input media
                    storage
                      .ref(mediaPath)
                      .getDownloadURL()
                      .then((url) => {
                        // Update the input media URL
                        docRef.update({
                          media: url,
                        });
                      })
                      .then(() => {
                        // Refresh input media
                        setInputMedia(null);
                        setUploadingMediaPreview(null as any);

                        if (inputMediaRef.current) {
                          inputMediaRef.current.value = "";
                        }

                        // Refresh upload loading
                        if (!inputFile) setUploadLoading(false);
                      });
                  });
                });
            }
          });
      }
    }

    // Single file upload handler
    setTimeout(() => {
      if (inputFile && user) {
        const messageObject: MessageType = {
          uid: user.uid,
          username: user.displayName as string,
          avatar: user.photoURL as string,
          type: "file",
          timestamp: new Date(),
          file: "",
          fileName: "",
        };

        if (blockMessagesId) {
          db.collection("roomMessages")
            .doc(blockMessagesId)
            .collection("dateMessages")
            .add(messageObject)
            .then((docRef) => {
              const filePath = `shared-file/${roomId}/${
                docRef.id +
                "." +
                inputFile.name.split(".")[inputFile.name.split(".").length - 1]
              }`;
              const fileRef = storageRef.child(filePath);

              fileRef.put(inputFile).then(() => {
                // Retrieve the downloaded URL of input file
                storage
                  .ref(filePath)
                  .getDownloadURL()
                  .then((url) => {
                    // Update the input file URL
                    docRef.update({
                      file: url,
                      fileName: inputFile.name,
                    });
                  })
                  .then(() => {
                    // Refresh input file
                    setInputFile(null);
                    setUploadingFilePreview(null as any);

                    if (inputFileRef.current) {
                      inputFileRef.current.value = "";
                    }

                    // Refresh upload loading
                    setUploadLoading(false);
                  });
              });
            });
        } else {
          db.collection("roomMessages")
            .add({
              roomId,
              timestamp: new Date(),
            })
            .then((docRef) => {
              if (docRef.id) {
                db.collection("roomMessages")
                  .doc(docRef.id)
                  .collection("dateMessages")
                  .add(messageObject)
                  .then((docRef) => {
                    const filePath = `shared-media/${roomId}/${
                      docRef.id +
                      "." +
                      inputFile.name.split(".")[
                        inputFile.name.split(".").length - 1
                      ]
                    }`;
                    const fileRef = storageRef.child(filePath);

                    fileRef.put(inputFile).then(() => {
                      // Retrieve the downloaded URL of input file
                      storage
                        .ref(filePath)
                        .getDownloadURL()
                        .then((url) => {
                          // Update the input file URL
                          docRef.update({
                            file: url,
                            fileName: inputFile.name,
                          });
                        })
                        .then(() => {
                          // Refresh input file
                          setInputFile(null);
                          setUploadingFilePreview(null as any);

                          if (inputFileRef.current) {
                            inputFileRef.current.value = "";
                          }

                          // Refresh upload loading
                          setUploadLoading(false);
                        });
                    });
                  });
              }
            });
        }
      }
    }, 1500);
  };

  const clearUploadingListHandler = () => {
    setUploadLoading(false);
    setInputMedia(null);
    setUploadingMediaPreview(null as any);
    setInputFile(null);
    setUploadingFilePreview(null as any);

    if (inputMediaRef.current && inputFileRef.current) {
      inputMediaRef.current.value = "";
      inputFileRef.current.value = "";
    }
  };

  useEffect(() => {
    if (chosenEmoji && textAreaRef.current)
      textAreaRef.current.value += chosenEmoji.emoji;
  }, [chosenEmoji]);

  return (
    <>
      <SendingAreaContainer ref={sendingAreaContainerRef} isOpen={isOpen}>
        {isOpen ? (
          <>
            <Options ref={optionsRef}>
              <UploadingList
                uploadingMedia={uploadingMediaPreview}
                uploadingFile={uploadingFilePreview}
                uploadLoading={uploadLoading}
                uploadHandler={uploadHandler}
                clearUploadingListHandler={clearUploadingListHandler}
              />
              <input
                type="file"
                accept="image/*, video/*"
                ref={inputMediaRef}
                onChange={inputMediaOnChangeHandler}
              />
              <input
                type="file"
                accept=".pdf, doc, .docx, xls, .xlsx, .rar, .zip"
                ref={inputFileRef}
                onChange={inputFileOnChangeHandler}
              />

              <Icon isOpen={isOpen} onClick={() => setOpenEmojiModal(true)}>
                <BiGhost />
                <Tooltip content="Emoji" arrow="bottom" />
              </Icon>
              <Icon isOpen={isOpen} onClick={showHiddenInputMediaHandler}>
                <BiImages />
                <Tooltip content="Image & Video" arrow="bottom" />
              </Icon>
              <Icon isOpen={isOpen} onClick={showHiddenInputFileHandler}>
                <BiFile />
                <Tooltip content="Attachment" arrow="bottom" />
              </Icon>
            </Options>

            <TextArea
              onChange={textAreaOnChangeHandler}
              onKeyDown={(event) => sendMessageHandler(event)}
              ref={textAreaRef}
              spellCheck="false"
              placeholder="Type a message..."
              autoFocus
              rows={1}
            />
          </>
        ) : null}

        <Icon onClick={stretchOutTextAreaHandler} isOpen={isOpen}>
          {isOpen ? <BiChevronRight /> : <BiMessageDetail />}
        </Icon>
      </SendingAreaContainer>

      <Modal
        type="emoji"
        emojiPicker={
          <Picker
            onEmojiClick={chosenEmojiHandler}
            disableAutoFocus={true}
            native
            pickerStyle={{
              width: "100%",
              boxShadow: "none",
              borderTop: "none",
            }}
          />
        }
        open={openEmojiModal}
        closeHandler={() => setOpenEmojiModal(false)}
      />
    </>
  );
};

export default SendingArea;

const SendingAreaContainer = styled.div<{ isOpen?: boolean }>`
  ${tw`
    flex
    justify-between
    sticky
    bottom-6
    p-3
    rounded-3xl
    opacity-90
    ml-auto
  `}

  ${({ isOpen }) =>
    isOpen
      ? css`
          ${tw`
            bg-gray-600
          `}

          animation: stretchIn 0.2s ease-in-out forwards;

          @keyframes stretchIn {
            from {
              width: 20%;
              opacity: 0;
            }
            to {
              width: 100%;
              opacity: 0.9;
            }
          }
        `
      : css`
          animation: stretchOut 0.3s ease-in-out forwards;

          @keyframes stretchOut {
            to {
              ${tw`
                bg-white
              `}

              width: fit-content;
            }
          }
        `}
`;

const TextArea = styled.textarea`
  ${tw`
    w-full
    text-white
    mx-4
    bg-transparent
    outline-none
    resize-none
    overflow-hidden
  `}
`;

const Options = styled.div`
  ${tw`
    flex
    relative
  `}

  span {
    ${tw`
      hover:text-blue-500
    `}

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  input {
    display: none;
  }
`;

const Icon = styled.span<{ isOpen?: boolean }>`
  ${tw`
    relative
    text-2xl
    cursor-pointer
  `}

  color: #9ca3af;

  span {
    ${tw`
      text-sm
    `}

    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    span {
      ${tw`
        visible
        transition-all
        duration-300
        ease-in-out
        text-white
      `}
    }
  }

  ${({ isOpen }) =>
    isOpen
      ? css`
          color: #9ca3af;
        `
      : css`
          color: #2c9984;
        `}
`;
