import { createContext, useContext, useState } from "react";
import { RoomType } from "../typings/RoomType";

type RoomsContextProps = {
  rooms: RoomType[] | any;
  setRooms: any;
};

const RoomsContext = createContext<Partial<RoomsContextProps>>({});

export const useRooms = () => {
  return useContext(RoomsContext);
};

export const RoomsProvider = ({ children }: any) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const roomsProviderValue = {
    rooms,
    setRooms,
  };

  return (
    <RoomsContext.Provider value={roomsProviderValue}>
      {children}
    </RoomsContext.Provider>
  );
};
