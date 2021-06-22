import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../../screens";
import { GroupType } from "../../typings/GroupType";

interface IGroupProps extends GroupType {}

const Group: FC<IGroupProps> = ({ id, image, title, content }) => {
  return (
    <GroupContainer id={`${id}`}>
      <ImageContainer>
        <img src={image} />
      </ImageContainer>

      <DescriptionContainer>
        <DescriptionTitle>{title}</DescriptionTitle>
        <DescriptionContent>{content}</DescriptionContent>
      </DescriptionContainer>
    </GroupContainer>
  );
};

export default Group;

const GroupContainer = styled.div`
  ${tw`
    flex
    flex-wrap
    px-7
    pt-24
    items-center
    justify-center
    md:pt-48
  `}
`;

const ImageContainer = styled.div`
  ${tw`
    w-auto
    flex
    items-center
    justify-center
    mb-2
    md:mb-0
  `}

  height: 4rem;

  img {
    width: auto;
    height: 100%;
  }

  @media (min-width: ${SCREENS.md}) {
    height: 5rem;
  }

  @media (min-width: ${SCREENS.lg}) {
    height: 6rem;
  }

  @media (min-width: ${SCREENS.xl}) {
    height: 9rem;
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
    max-w-5xl
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
  `}
`;
