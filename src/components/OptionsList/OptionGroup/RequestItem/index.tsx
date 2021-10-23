import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RequestItemType } from "../../../../typings/RequestItemType";
import { AiFillEye } from "react-icons/ai";

interface IRequestItemProps extends RequestItemType {}

const RequestItem: FC<IRequestItemProps> = ({
  uid,
  username,
  avatar,
  request,
  timestamp,
}) => {
  return (
    <RequestItemContainer>
      <InnerRequestItemContainer title={username}>
        <AvatarContainer>
          <img loading="lazy" src={avatar} />
        </AvatarContainer>

        <RequestInfo>
          <RequestUser>From {username}</RequestUser>
          <RequestItemText>
            Request to {request.toLowerCase()} 👋
          </RequestItemText>
        </RequestInfo>
      </InnerRequestItemContainer>

      <Icon>
        <AiFillEye />
      </Icon>
    </RequestItemContainer>
  );
};

export default RequestItem;

const RequestItemContainer = styled.div`
  ${tw`
    rounded
    flex
    items-center
    justify-between
    transition-all
    duration-300
    ease-in-out
    p-2
  `}

  &:hover {
    background-color: rgb(51, 54, 60);

    span {
      ${tw`
        visible
        transition-all
        duration-300
        ease-in-out
      `}
    }
  }

  opacity: 0;
  animation: fadeIn 0.2s ease-in-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const AvatarContainer = styled.div`
  img {
    ${tw`
      h-8
      w-8
    `}

    border-radius: 50%;
  }
`;

const InnerRequestItemContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-between
  `}
`;

const RequestInfo = styled.div`
  ${tw`
    flex
    flex-col
    ml-2
    pointer-events-none
  `}
`;

const RequestItemText = styled.p`
  ${tw`
    text-xs
    text-gray-300
  `}
`;

const RequestUser = styled.p`
  ${tw`
    text-sm
    overflow-ellipsis
    overflow-x-hidden
    whitespace-nowrap
    mb-1
  `}

  max-width: 12em;
`;

const Icon = styled.span`
  ${tw`
    text-gray-300
    text-lg
    cursor-pointer
    invisible
  `}
`;
