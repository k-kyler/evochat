import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface ITooltipProps {
  content: string;
  arrow: "left" | "top" | "bottom";
  left?: number;
}

const Tooltip: FC<ITooltipProps> = ({ content, arrow, left }) => {
  return (
    <TooltipContainer left={left} arrow={arrow}>
      {content}
    </TooltipContainer>
  );
};

export default Tooltip;

const TooltipContainer = styled.span<{ arrow: string; left?: number }>`
  ${tw`
    absolute
    text-center
    text-sm
    rounded-md
    invisible
    p-2
  `}

  background-color: rgba(0, 0, 0, 0.95);
  width: max-content;
  z-index: 1;
  left: ${({ left }) => (left ? left : 0)}%;

  &::after {
    ${tw`absolute`}

    content: "";
    border-width: 7px;
    border-style: solid;

    /* Left arrow */
    ${({ arrow }) =>
      arrow === "left" &&
      css`
        ${tw`
          right-full
          top-1/2
        `}

        margin-top: -7px;
        border-color: transparent black transparent transparent;
      `}

    /* Bottom arrow */
    ${({ arrow }) =>
      arrow === "bottom" &&
      css`
        ${tw`left-1/2`}

        top: 117%;
        transform: translate(-50%, -50%);
        border-color: black transparent transparent;
      `}
  }
`;
