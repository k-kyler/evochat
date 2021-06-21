import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroSection from "./IntroSection";
import NavBar from "../../components/NavBar";
import Group from "../../components/Group";

import ChatImage from "../../assets/chat.svg";

const AboutData = {
  id: "about",
  image: ChatImage,
  title: "About",
  content:
    "Evochat is an open-source project created by kkyler (Quang Khai) that provides a realtime platform for users to chat in realtime using features of Firebase and React.js",
};

const Home: FC = () => {
  return (
    <HomeContainer>
      <NavBar />
      <IntroSection />
      <Group {...AboutData} />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    overflow-x-hidden
    h-full
    w-full
  `}
`;
