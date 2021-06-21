import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IButtonProps {
  content: string;
  theme?: "filled" | "outlined" | "google" | "facebook";
}

const Button: FC<IButtonProps> = ({ content, theme }) => {
  if (theme === "filled") return <FilledButton>{content}</FilledButton>;
  return <OutlinedButton>{content}</OutlinedButton>;
};

export default Button;

const BaseButton = styled.button`
  ${tw`
    text-white
    text-xs
    font-semibold
    rounded-md
    pl-5
    pr-5
    pt-3
    pb-3
    border-transparent
    border-2
    border-solid
    transition-all
    duration-300
    ease-in-out
    outline-none
    focus:outline-none
  `}
`;

const OutlinedButton = styled(BaseButton)`
  ${tw`
    bg-transparent
    text-red-500
    border-red-500
    hover:bg-red-500
    hover:text-white
    hover:border-transparent
  `}
`;

const FilledButton = styled(BaseButton)`
  ${tw`
    bg-red-500
    hover:bg-transparent
    hover:text-red-500
    hover:border-red-500
  `}
`;
