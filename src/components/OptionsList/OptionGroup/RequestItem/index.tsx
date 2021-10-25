import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RequestItemType } from "../../../../typings/RequestItemType";

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
      <AvatarContainer title={username}>
        <img loading="lazy" src={avatar} />
      </AvatarContainer>

      {request === "Join room" ? (
        <RequestItemText>
          {username} requests to {request.toLowerCase()}
        </RequestItemText>
      ) : null}
    </RequestItemContainer>
  );
};

export default RequestItem;

const RequestItemContainer = styled.div`
  ${tw`
    rounded
    flex
    items-center
    transition-all
    duration-300
    ease-in-out
    p-2
    cursor-pointer
    relative
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

const AvatarContainer = styled.div`
  img {
    ${tw`
      h-8
      w-8
    `}

    border-radius: 50%;
  }
`;

const RequestItemText = styled.p`
  ${tw`
    text-sm
    ml-2
    pointer-events-none
    overflow-x-hidden
    overflow-ellipsis
    whitespace-nowrap
  `}

  max-width: 14.5em;
`;
