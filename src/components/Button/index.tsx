import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface IButtonProps {
  content: string;
  theme?: "filled" | "outlined" | "normal" | "google" | "facebook";
  color?: "red" | "blue";
  clickHandler?: () => void;
}

const Button: FC<IButtonProps> = ({ content, theme, color, clickHandler }) => {
  if (theme === "filled")
    return (
      <FilledButton color={color} onClick={clickHandler && clickHandler}>
        {content}
      </FilledButton>
    );
  if (theme === "normal")
    return (
      <NormalButton color={color} onClick={clickHandler && clickHandler}>
        {content}
      </NormalButton>
    );
  if (theme === "google")
    return (
      <GoogleButton onClick={clickHandler && clickHandler}>
        <Icon>
          <FcGoogle />
        </Icon>
        {content}
      </GoogleButton>
    );
  if (theme === "facebook")
    return (
      <FacebookButton onClick={clickHandler && clickHandler}>
        <Icon>
          <FaFacebook />
        </Icon>
        {content}
      </FacebookButton>
    );
  return (
    <OutlinedButton color={color} onClick={clickHandler && clickHandler}>
      {content}
    </OutlinedButton>
  );
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

const OutlinedButton = styled(BaseButton)<{ color?: string }>`
  ${tw`
    bg-transparent
    hover:text-white
    hover:border-transparent
  `}

  ${({ color }) =>
    color === "blue"
      ? tw`
    text-blue-500
    border-blue-500
    hover:bg-blue-500
  `
      : tw`
    text-red-500
    border-red-500
    hover:bg-red-500
  `}
`;

const FilledButton = styled(BaseButton)<{ color?: string }>`
  ${tw`
    hover:bg-transparent
  `}

  ${({ color }) =>
    color === "blue"
      ? tw`
    bg-blue-500
    hover:text-blue-500
    hover:border-blue-500
  `
      : tw`
    bg-red-500
    hover:text-red-500
    hover:border-red-500
  `}
`;

const NormalButton = styled(BaseButton)<{ color?: string }>`
  ${tw`
    text-white
  `}

  ${({ color }) =>
    color === "blue"
      ? tw`
    bg-blue-500
    hover:bg-blue-600
  `
      : tw`
    bg-red-500
    hover:bg-red-600
  `}
`;

const Icon = styled.span`
  ${tw`
    text-lg
    mr-2
    2xl:text-2xl
  `}
`;

const GoogleButton = styled(BaseButton)`
  ${tw`
    flex
    items-center
    text-sm
    bg-white
    text-black
    hover:bg-transparent
    hover:text-red-500
    hover:border-red-500
    2xl:text-base
  `}
`;

const FacebookButton = styled(GoogleButton)`
  ${tw`
    bg-blue-500
    text-white
    hover:bg-transparent
    hover:text-blue-500
    hover:border-blue-500
    2xl:text-base
  `}
`;
