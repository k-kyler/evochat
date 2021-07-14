import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaUser } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { MemberItemType } from "../../../../typings/MemberItemType";
import OnlineStatus from "../../../OnlineStatus";

interface IMemberItemProps extends MemberItemType {}

const MemberItem: FC<IMemberItemProps> = ({
  username,
  avatar,
  active,
  uid,
  oid,
  clickHandler,
}) => {
  return (
    <MemberItemContainer onClick={clickHandler && clickHandler}>
      <InfoContainer>
        {avatar ? (
          <AvatarContainer>
            <img src={avatar} />
            <OnlineStatus effect="none" />
          </AvatarContainer>
        ) : (
          <Icon>
            <FaUser />
          </Icon>
        )}

        <Content title={username}>{username}</Content>

        {uid === oid && (
          <SmallIcon title="Room's admin">
            <RiVipCrownFill />
          </SmallIcon>
        )}
      </InfoContainer>
    </MemberItemContainer>
  );
};

export default MemberItem;

const MemberItemContainer = styled.div`
  ${tw`
    rounded
    flex
    items-center
    transition-all
    duration-300
    ease-in-out
    cursor-pointer
    p-2
  `}

  &:hover {
    background-color: rgb(51, 54, 60);
  }

  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const InfoContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  span {
    ${tw`
      ml-1
      text-yellow-400
      text-base
    `}
  }
`;

const AvatarContainer = styled.div`
  ${tw`
    relative
  `}

  img {
    ${tw`
      h-8
      w-8
    `}

    border-radius: 50%;
  }
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

  max-width: 13em;
`;
