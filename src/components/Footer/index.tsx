import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../Logo";
import { AiFillGithub, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";

const Footer: FC = () => {
  return (
    <FooterContainer>
      <InnerContainer>
        <BrandContainer>
          <Logo color="white" />
        </BrandContainer>

        <Divider />

        <CopyRightContainer>
          <CopyRightContent>
            © 2021. Evochat by kkyler. All rights reserved.
          </CopyRightContent>

          <IconsContainer>
            <a href="https://github.com/k-kyler/evochat" target="__blank">
              <Icon>
                <AiFillGithub />
              </Icon>
            </a>
            <a href="https://www.facebook.com/quangkhai.005" target="__blank">
              <Icon>
                <AiFillFacebook />
              </Icon>
            </a>
            <a href="https://www.linkedin.com/in/imkhai/" target="__blank">
              <Icon>
                <AiFillLinkedin />
              </Icon>
            </a>
          </IconsContainer>
        </CopyRightContainer>
      </InnerContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  ${tw`
    min-w-full
    py-4
    mt-24
    md:mt-48
  `}

  background-color: #23272a;
`;

const InnerContainer = styled.div`
  ${tw`
    max-w-screen-2xl
    flex
    flex-col
    px-4
    md:px-12
    xl:mx-auto
  `}
`;

const BrandContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
    text-2xl
    text-gray-300
    lg:text-3xl
    hover:text-gray-400
    transition-all
    duration-300
    ease-in-out
  `}
`;

const IconsContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  a:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Divider = styled.div`
  ${tw`
    my-4
  `}

  background-color: hsla(0, 0%, 100%, 0.06);
  height: 0.1rem;
`;

const CopyRightContainer = styled.div`
  ${tw`
    min-w-full
    flex
    items-center
    justify-between
  `}
`;

const CopyRightContent = styled.p`
  ${tw`
    text-sm
    text-gray-400
  `}
`;
