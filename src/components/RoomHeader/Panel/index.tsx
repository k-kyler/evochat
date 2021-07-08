import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PanelOptionType } from "../../../typings/PanelOptionType";
import PanelOption from "./PanelOption";
import { useAuth } from "../../../contexts/AuthContext";

interface IPanelProps {
  oid?: string;
  generalData: PanelOptionType[];
  adminData: PanelOptionType[];
  open: boolean;
}

const Panel: FC<IPanelProps> = ({ oid, generalData, adminData, open }) => {
  const { user } = useAuth();

  if (!open) return null;
  return (
    <PanelContainer>
      {user?.uid !== oid
        ? generalData.map((data) => <PanelOption key={data.id} {...data} />)
        : adminData.map((data) => <PanelOption key={data.id} {...data} />)}
    </PanelContainer>
  );
};

export default Panel;

const PanelContainer = styled.div`
  ${tw`
    p-3
    rounded-md
    flex
    flex-col
    absolute
    bg-black
  `}

  z-index: 1;
  top: 130%;
  left: 0.75rem;
  right: 0.75rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 7px rgba(0, 0, 0, 0.4);
  transform: scale(0.8);
  animation: popup 0.2s ease-in-out forwards;

  @keyframes popup {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
`;
