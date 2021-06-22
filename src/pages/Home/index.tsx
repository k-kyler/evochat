import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroSection from "./IntroSection";
import NavBar from "../../components/NavBar";
import Group from "../../components/Group";
import { GroupType } from "../../typings/GroupType";

import AboutImage from "../../assets/about.svg";
import ServicesImage from "../../assets/services.svg";

const groupData: GroupType[] = [
  {
    id: "about",
    image: AboutImage,
    title: "About",
    content:
      "Evochat is an open-source project created by kkyler (Quang Khai) that provides a realtime platform for users to chat in realtime using features of Firebase and React.js",
  },
  {
    id: "services",
    image: ServicesImage,
    title: "Services",
    content:
      "Evochat provides a realtime communication between connecting users, you can send message or upload image and video to other users rapidly.",
  },
];

const Home: FC = () => {
  return (
    <HomeContainer>
      <NavBar />
      <IntroSection />
      {groupData.map((group) => (
        <Group key={group.id} {...group} />
      ))}
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
