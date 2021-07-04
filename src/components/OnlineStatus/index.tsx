import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface IOnlineStatusProps {
  effect: "ripple" | "none";
}

const OnlineStatus: FC<IOnlineStatusProps> = ({ effect }) => {
  return <OnlineStatusContainer effect={effect}></OnlineStatusContainer>;
};

export default OnlineStatus;

const OnlineStatusContainer = styled.div<{ effect: string }>`
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

    ${({ effect }) =>
      effect === "ripple"
        ? css`
            animation: ripple 1.2s infinite ease-in-out;
          `
        : null}
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
