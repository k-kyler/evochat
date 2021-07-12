import { MessageType } from "./MessageType";

type RoomMember = {
  uid?: string;
};

export type RoomType = {
  id: string;
  oid: string;
  name: string;
  background?: string;
  members?: RoomMember[];
  messages?: MessageType[];
  timestamp?: any;
};
