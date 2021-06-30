export type RoomType = {
  id: string;
  name: string;
  background?: string;
  chosenRoomId?: string;
  clickHandler?: () => void;
};
