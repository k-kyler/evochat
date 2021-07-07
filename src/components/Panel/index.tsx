import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PanelOptionType } from "../../typings/PanelOptionType";
import PanelOption from "./PanelOption";

interface IPanelProps {
  data: PanelOptionType[];
}

const Panel: FC = () => {
  return (
    <PanelContainer>
      {/* <PanelOption name="Room setting" icon={<FcSupport />} />

      <Divider />

      <PanelOption name="Change name" icon={<FcDocument />} />
      <PanelOption name="Change background" icon={<FcLandscape />} />

      <Divider />

      <PanelOption name="Invite member" icon={<FcAbout />} highlight="blue" />

      <Divider />

      <PanelOption name="Leave room" icon={<FcImport />} highlight="red" /> */}
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
`;

const Divider = styled.div`
  ${tw`
    my-2
  `}

  background-color: rgba(255, 255, 255, 0.1);
  height: 0.1px;
`;
