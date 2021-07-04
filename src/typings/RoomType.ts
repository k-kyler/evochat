type RoomMembers = {
  uid?: string;
};

export type RoomType = {
  id: string;
  oid: string;
  name: string;
  background?: string;
  members?: RoomMembers[];
};
