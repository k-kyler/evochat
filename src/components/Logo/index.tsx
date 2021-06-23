import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import WebLogo from "../../assets/web-logo.svg";

interface ILogoProps {
  color?: "black" | "white";
}

const Logo: FC<ILogoProps> = ({ color }) => {
  return (
    <WebLogoContainer>
      <WebLogoImage>
        <img src={WebLogo} alt="Evochat" />
      </WebLogoImage>

      <WebLogoText color={color || "black"}>Evochat</WebLogoText>
    </WebLogoContainer>
  );
};

export default Logo;

const WebLogoContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const WebLogoText = styled.div`
  ${tw`
    text-black
    m-1
    text-xl
    md:text-2xl
    font-bold
    pointer-events-none
  `}

  ${({ color }: any) => (color === "black" ? tw`text-black` : tw`text-white`)}
`;

const WebLogoImage = styled.div`
  ${tw`
    h-6
    md:h-9
  `}

  width: auto;

  img {
    width: auto;
    height: 100%;
  }
`;
