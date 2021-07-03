import { FC } from "react";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { useAuth } from "../../contexts/AuthContext";
import Tooltip from "../Tooltip";

const UserSection: FC = () => {
  const { user } = useAuth();

  return (
    <UserSectionContainer>
      <UserInfo>
        <AvatarContainer>
          <img src={String(user?.photoURL)} />
          <OnlineStatus />
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
    border-radius: 50px;
  }
`;

const OnlineStatus = styled.div`
  ${tw`
    rounded-full
    absolute
    bottom-0
    right-0
  `}

  width: 0.6rem;
  height: 0.6rem;
  background-color: #3ba55d;

  &::after {
    ${tw`
      h-full
      w-full
      absolute
      rounded-full
    `}

    content: '';
    border: 1px solid #3ba55d;
    animation: ripple 1.2s infinite ease-in-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
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
