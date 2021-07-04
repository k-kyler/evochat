import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FaUser } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { MemberItemType } from "../../typings/MemberItemType";

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
          <img src={avatar} />
        ) : (
          <Icon>
            <FaUser />
          </Icon>
        )}

        <Content title={username}>
          {username}
          {uid === oid && (
            <SmallIcon>
              <RiVipCrownFill />
            </SmallIcon>
          )}
        </Content>
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

  img {
    width: 2rem;
    height: 2rem;
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
    text-xs
    overflow-ellipsis
    whitespace-nowrap
    overflow-x-hidden
    flex
    items-center
  `}

  width: 12em;

  span {
    ${tw`
      ml-2
      text-yellow-400
      text-base
    `}
  }
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
