import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FiTwitch } from "react-icons/fi";
import { IoIosSettings, IoMdPersonAdd } from "react-icons/io";
import { RoomType } from "../../typings/RoomType";

interface IRoomItemProps extends RoomType {}

const RoomItem: FC<IRoomItemProps> = ({ id, name, chosenId, clickHandler }) => {
  if (id === chosenId)
    return (
      <RoomItemContainer active onClick={clickHandler && clickHandler}>
        <TitleContainer>
          <Icon>
            <FiTwitch />
          </Icon>

          <Content>{name}</Content>
        </TitleContainer>

        <SmallIcons active>
          <SmallIcon>
            <IoMdPersonAdd />
          </SmallIcon>
          <SmallIcon>
            <IoIosSettings />
          </SmallIcon>
        </SmallIcons>
      </RoomItemContainer>
    );
  return (
    <RoomItemContainer onClick={clickHandler && clickHandler}>
      <TitleContainer>
        <Icon>
          <FiTwitch />
        </Icon>

        <Content>{name}</Content>
      </TitleContainer>

      <SmallIcons>
        <SmallIcon>
          <IoMdPersonAdd />
        </SmallIcon>
        <SmallIcon>
          <IoIosSettings />
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

  span:nth-child(1) {
    margin-right: 0.5rem;
  }

  ${({ active }) =>
    !active &&
    css`
      span {
        display: none;
      }
    `}
`;
