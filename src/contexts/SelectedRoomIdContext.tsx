import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type SelectedRoomIdContextProps = {
  selectedRoomId: string;
  setSelectedRoomId: Dispatch<SetStateAction<string>> | any;
};

const SelectedRoomIdContext = createContext<
  Partial<SelectedRoomIdContextProps>
>({});

export const useSelectedRoomId = () => {
  return useContext(SelectedRoomIdContext);
};

export const SelectedRoomIdProvider = ({ children }: any) => {
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const selectedRoomIdProviderValue = {
    selectedRoomId,
    setSelectedRoomId,
  };

  return (
    <SelectedRoomIdContext.Provider value={selectedRoomIdProviderValue}>
      {children}
    </SelectedRoomIdContext.Provider>
  );
};
