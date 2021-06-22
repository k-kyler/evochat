import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroSection from "./IntroSection";
import NavBar from "../../components/NavBar";
import Group from "../../components/Group";
import Footer from "../../components/Footer";
import { GroupType } from "../../typings/GroupType";

import AboutImage from "../../assets/about.svg";
import ServicesImage from "../../assets/services.svg";
import ContactImage from "../../assets/contact.svg";

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
      "Evochat provides a realtime communication between connecting users, you can send message or upload image and video to other users rapidly",
  },
  {
    id: "contact",
    image: ContactImage,
    title: "Contact",
    content:
      "I'm kkyler (Quang Khai), please contact with me if there are any issues through this email khaiquang690@gmail.com",
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
      <Footer />
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
