import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FiTwitch } from "react-icons/fi";
import { FaCog, FaUserPlus } from "react-icons/fa";
import { RoomType } from "../../typings/RoomType";

interface IRoomItemProps extends RoomType {}

const RoomItem: FC<IRoomItemProps> = ({ id, name, chosenId }) => {
  if (id === chosenId)
    return (
      <RoomItemContainer active>
        <TitleContainer>
          <Icon>
            <FiTwitch />
          </Icon>

          <Content>{name}</Content>
        </TitleContainer>

        <SmallIcons active>
          <SmallIcon>
            <FaUserPlus />
          </SmallIcon>
          <SmallIcon>
            <FaCog />
          </SmallIcon>
        </SmallIcons>
      </RoomItemContainer>
    );
  return (
    <RoomItemContainer>
      <TitleContainer>
        <Icon>
          <FiTwitch />
        </Icon>

        <Content>{name}</Content>
      </TitleContainer>

      <SmallIcons>
        <SmallIcon>
          <FaUserPlus />
        </SmallIcon>
        <SmallIcon>
          <FaCog />
        </SmallIcon>
      </SmallIcons>
    </RoomItemContainer>
  );
};

export default RoomItem;

const RoomItemContainer = styled.div<{ active?: boolean }>`
  ${tw`
    p-2
    mb-1
    rounded
    flex
    items-center
    justify-between
    transition-all
    duration-300
    ease-in-out
    cursor-pointer
  `}

  &:hover {
    background-color: rgb(51, 54, 60);

    span {
      display: block;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background-color: rgb(57, 60, 66);

      &:hover {
        background-color: rgb(57, 60, 66);
      }
    `}
`;

const TitleContainer = styled.div`
  ${tw`
    flex
    items-center
  `}
`;

const Icon = styled.span`
  ${tw`
    text-xl
    text-gray-400
  `}
`;

const SmallIcon = styled.span`
  ${tw`
    text-sm
    text-gray-400
  `}
`;

const Content = styled.p`
  ${tw`
    ml-2
    text-sm
  `}
`;

const SmallIcons = styled.div<{ active?: boolean }>`
  ${tw`
    flex
    items-center
  `}

  span:nth-child(1) {
    margin-right: 0.75rem;
  }

  ${({ active }) =>
    !active &&
    css`
      span {
        display: none;
      }
    `}
`;
