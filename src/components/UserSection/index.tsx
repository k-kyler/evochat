import { FC } from "react";
import { FaListUl } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { UserType } from "../../typings/UserType";

interface IUserSectionProps extends UserType {}

const UserSection: FC<IUserSectionProps> = ({ user }) => {
  return (
    <UserSectionContainer>
      <UserInfo>
        <img src={String(user?.photoURL)} />
        <Content>{user?.displayName}</Content>
      </UserInfo>
      <Icon>
        <FaListUl />
      </Icon>
    </UserSectionContainer>
  );
};

export default UserSection;

const UserSectionContainer = styled.div`
  ${tw`
    px-2
    py-3
    flex
    items-center
    justify-between
  `}

  background-color: #292b2f;
`;

const UserInfo = styled.div`
  ${tw`
    flex
    items-center
  `}

  img {
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 50px;
  }
`;

const Content = styled.p`
  ${tw`
    text-sm
    overflow-ellipsis
    whitespace-nowrap
    overflow-x-hidden
  `}

  width: 10em;
`;

const Icon = styled.span`
  ${tw`
    cursor-pointer
    text-base
    p-2
    rounded-md
    transition-all
    duration-300
    ease-in-out
    text-gray-400
  `}

  &:hover {
    background-color: #2f3136;
  }
`;
