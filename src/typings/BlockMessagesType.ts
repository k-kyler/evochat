import { MessageType } from "./MessageType";

export type BlockMessagesType = {
  id: string;
  roomId: string;
  timestamp: any;
  selectedRoomTimestamp?: any;
  dateMessages: MessageType[];
};
