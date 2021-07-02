import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

interface IMemberItemProps {
  name: string;
  avatar: string;
  active: boolean;
  clickHandler?: () => void;
}

const MemberItem: FC<IMemberItemProps> = ({
  name,
  avatar,
  active,
  clickHandler,
}) => {
  return (
    <MemberItemContainer onClick={clickHandler && clickHandler}>
      <InfoContainer>
        <Icon>
          <FaUser />
        </Icon>

        <Content>{name}</Content>
      </InfoContainer>

      <SmallIcons>
        <SmallIcon>
          <IoIosSettings />
        </SmallIcon>
      </SmallIcons>
    </MemberItemContainer>
  );
};

export default MemberItem;

const MemberItemContainer = styled.div`
  ${tw`
    rounded
    flex
    items-center
    justify-between
    transition-all
    duration-300
    ease-in-out
    cursor-pointer
    p-2
  `}

  &:hover {
    background-color: rgb(51, 54, 60);

    span {
      display: block;
    }
  }
`;

const InfoContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
    text-sm
    text-gray-400
    rounded-full
    bg-gray-600
    p-2
  `}
`;

const SmallIcon = styled.span`
  ${tw`
    text-lg
    text-gray-400
  `}
`;

const Content = styled.p`
  ${tw`
    ml-2
    text-sm
    overflow-ellipsis
    whitespace-nowrap
    overflow-x-hidden
  `}

  width: 9em;
`;

const SmallIcons = styled.div<{ active?: boolean }>`
  ${tw`
    flex
    items-center
  `}

  ${({ active }) =>
    !active &&
    css`
      span {
        display: none;
      }
    `}
`;
