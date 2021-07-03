type RoomMembers = {
  uid: string;
};

export type RoomType = {
  id: string;
  name: string;
  background?: string;
  members?: RoomMembers[];
};
