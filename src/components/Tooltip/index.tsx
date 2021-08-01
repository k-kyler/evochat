import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface ITooltipProps {
  content: string;
  arrow: "left" | "top" | "bottom";
  errorStyle?: boolean;
}

const Tooltip: FC<ITooltipProps> = ({ content, arrow, errorStyle }) => {
  return (
    <TooltipContainer arrow={arrow} errorStyle={errorStyle}>
      {content}
    </TooltipContainer>
  );
};

export default Tooltip;

const TooltipContainer = styled.span<{
  arrow: string;
  errorStyle?: boolean;
}>`
  ${tw`
    absolute
    text-center
    text-sm
    rounded-md
    p-2
  `}

  ${({ errorStyle }) =>
    errorStyle
      ? tw`
        text-white
      bg-red-500
        shadow-md
      `
      : css`
          ${tw`
            invisible
          bg-black
          `}

          box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2), 2px 5px 7px rgba(0, 0, 0, 0.4);
        `}

  width: max-content;
  z-index: 1;

  &::after {
    ${tw`absolute`}

    content: "";
    border-width: 7px;
    border-style: solid;

    /* Left arrow */
    ${({ arrow, errorStyle }) =>
      arrow === "left" &&
      css`
        ${tw`
          top-1/2
        `}

        right: 99.5%;
        margin-top: -7px;

        ${errorStyle
          ? css`
              border-color: transparent rgba(239, 68, 68) transparent
                transparent;
            `
          : css`
              border-color: transparent black transparent transparent;
            `}
      `}

    /* Top arrow */
    ${({ arrow, errorStyle }) =>
      arrow === "top" &&
      css`
        ${tw`left-1/2`}

        top: -17%;
        transform: translate(-50%, -50%);

        ${errorStyle
          ? css`
              border-color: transparent transparent rgba(239, 68, 68);
            `
          : css`
              border-color: transparent transparent black;
            `}
      `}

    /* Bottom arrow */
    ${({ arrow, errorStyle }) =>
      arrow === "bottom" &&
      css`
        ${tw`left-1/2`}

        top: 117%;
        transform: translate(-50%, -50%);

        ${errorStyle
          ? css`
              border-color: rgba(239, 68, 68) transparent transparent;
            `
          : css`
              border-color: black transparent transparent;
            `}
      `}
  }
`;
