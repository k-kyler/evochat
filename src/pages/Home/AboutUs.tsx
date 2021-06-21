import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../../screens";
import ChatImage from "../../assets/chat.svg";

const AboutUs: FC = () => {
  return (
    <AboutUsContainer id="aboutus">
      <ChatContainer>
        <img src={ChatImage} />
      </ChatContainer>

      <DescriptionContainer>
        <DescriptionTitle>About</DescriptionTitle>

        <DescriptionContent>
          Evochat is an open-source project created by kkyler (Quang Khai) that
          provides a realtime social chat network using features of Firebase And
          React.js
        </DescriptionContent>
      </DescriptionContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;

const AboutUsContainer = styled.div`
  ${tw`
    flex
    flex-wrap
    px-7
    py-24
    items-center
    justify-center
    md:py-48
  `}
`;

const ChatContainer = styled.div`
  ${tw`
    w-auto
    flex
    items-center
    justify-center
    mb-2
    md:mb-0
  `}

  height: 5rem;

  img {
    width: auto;
    height: 100%;
  }

  @media (min-width: ${SCREENS.md}) {
    height: 6rem;
  }

  @media (min-width: ${SCREENS.lg}) {
    height: 12rem;
  }

  @media (min-width: ${SCREENS["2xl"]}) {
    margin-left: 0;
    height: 14rem;
  }
`;

const DescriptionContainer = styled.div`
  ${tw`
    flex
    flex-col
    md:w-11/12
    md:ml-6
    md:mr-6
    lg:w-1/2
    lg:ml-8
    lg:mr-0
    2xl:ml-16
  `}
`;

const DescriptionContent = styled.p`
  ${tw`
    font-normal
    max-w-2xl
    text-gray-300
    text-xs
    lg:text-sm
    xl:text-lg
`}
`;

const DescriptionTitle = styled.h1`
  ${tw`
    font-bold
    mb-2
    text-white
    text-2xl
    sm:text-3xl
    sm:leading-snug
    md:text-5xl
    md:font-extrabold
    lg:font-black
    lg:leading-normal
    xl:text-6xl
    xl:leading-relaxed
  `}
`;
