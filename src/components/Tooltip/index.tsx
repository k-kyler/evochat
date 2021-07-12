import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface ITooltipProps {
  content: string;
  arrow: "left" | "top" | "bottom";
  positionConfig?: "fixed" | "absolute";
}

const Tooltip: FC<ITooltipProps> = ({ content, arrow, positionConfig }) => {
  return (
    <TooltipContainer arrow={arrow} positionConfig={positionConfig}>
      {content}
    </TooltipContainer>
  );
};

export default Tooltip;

const TooltipContainer = styled.span<{
  arrow: string;
  positionConfig?: string;
}>`
  ${({ positionConfig }) =>
    positionConfig === "fixed" ? tw`fixed` : tw`absolute`}

  ${tw`
    text-center
    text-sm
    rounded-md
    invisible
    p-2
    bg-black
  `}

  width: max-content;
  z-index: 1;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2), 2px 5px 7px rgba(0, 0, 0, 0.4);

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

    /* Top arrow */
    ${({ arrow }) =>
      arrow === "top" &&
      css`
        ${tw`left-1/2`}

        top: -17%;
        transform: translate(-50%, -50%);
        border-color: transparent transparent black;
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
