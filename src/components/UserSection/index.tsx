import { FC } from "react";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { useAuth } from "../../contexts/AuthContext";
import Tooltip from "../Tooltip";
import OnlineStatus from "../OnlineStatus";

const UserSection: FC = () => {
  const { user } = useAuth();

  return (
    <UserSectionContainer>
      <UserInfo>
        <AvatarContainer>
          <img src={String(user?.photoURL)} />
          <OnlineStatus effect="ripple" />
        </AvatarContainer>
        <Content title={`${user?.displayName}`}>{user?.displayName}</Content>
      </UserInfo>

      <Icon>
        <FaCog />
        <Tooltip content="User setting" arrow="bottom" />
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
    relative
  `}

  background-color: #292b2f;
`;

const UserInfo = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const AvatarContainer = styled.div`
  ${tw`
    relative
  `}

  img {
    height: 2rem;
    width: auto;
    border-radius: 9999px;
  }
`;

const Content = styled.p`
  ${tw`
    text-sm
    overflow-ellipsis
    whitespace-nowrap
    overflow-x-hidden
    ml-2
  `}

  max-width: 11.5em;
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
    relative
  `}

  span {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background-color: #2f3136;

    span {
      ${tw`
        visible
        transition-all
        duration-300
        ease-in-out
        text-white
      `}
    }
  }
`;
