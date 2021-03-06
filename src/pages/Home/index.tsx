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
import { nanoid } from "nanoid";

const groupData: GroupType[] = [
  {
    id: nanoid(),
    htmlId: "about",
    image: AboutImage,
    title: "About",
    content:
      "Evochat is an open-source project created by kkyler (Quang Khai) that provides a realtime platform for users to communicate in realtime using features of Firebase and React.js",
  },
  {
    id: nanoid(),
    htmlId: "services",
    image: ServicesImage,
    title: "Services",
    content:
      "Evochat provides a realtime communication between connecting users, you can send message or share your images and videos to other users rapidly",
  },
  {
    id: nanoid(),
    htmlId: "contact",
    image: ContactImage,
    title: "Contact",
    content:
      "I'm kkyler (Quang Khai), please contact with me if there are any issues through my email <a href='mailto:khaiquang690@gmail.com'>khaiquang690@gmail.com</a>",
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
    overflow-y-auto
    h-full
    w-full
  `}

  scroll-behavior: smooth;

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #2f3136;
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-600
      rounded-lg
    `}
  }

  /* Firefox */
  scrollbar-width: auto;
  scrollbar-color: #4b5563 #2f3136;
`;
