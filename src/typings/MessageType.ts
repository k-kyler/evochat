export type MessageType = {
  id: string;
  uid?: string;
  username?: string;
  avatar?: string;
  message?: string;
  timestamp?: any;
  active: boolean;
  type: "text" | "video" | "image";
};
