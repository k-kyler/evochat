import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../Logo";
import { DiGithubAlt } from "react-icons/di";

const Footer: FC = () => {
  return (
    <FooterContainer>
      <InnerContainer>
        <BrandContainer>
          <Logo color="white" />
          <GitRepo>
            <Icon>
              <DiGithubAlt />
            </Icon>
          </GitRepo>
        </BrandContainer>

        <Divider />

        <CopyRightContainer>
          <CopyRightContent>
            © 2021. Evochat by kkyler. All rights reserved.
          </CopyRightContent>
        </CopyRightContainer>
      </InnerContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  ${tw`
    min-w-full
    bg-gray-600
    py-4
    mt-24
    md:mt-48
  `}
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
    justify-between
  `}
`;

const Icon = styled.span`
  ${tw`
    text-2xl
    text-gray-300
    lg:text-3xl
    xl:text-4xl
  `}
`;

const GitRepo = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Divider = styled.div`
  ${tw`
    bg-gray-700
    my-2
  `}

  height: 0.1rem;
`;

const CopyRightContainer = styled.div`
  ${tw`
    min-w-full
    mt-2
  `}
`;

const CopyRightContent = styled.p`
  ${tw`
    text-sm
    text-gray-400
  `}
`;
