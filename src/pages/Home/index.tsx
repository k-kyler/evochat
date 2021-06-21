import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IntroSection from "./IntroSection";
import NavBar from "../../components/NavBar";
import AboutUs from "./AboutUs";

const Home: FC = () => {
  return (
    <HomeContainer>
      <NavBar />
      <IntroSection />
      <AboutUs />
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
