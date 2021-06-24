import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface IButtonProps {
  content: string;
  theme?: "filled" | "outlined" | "google" | "facebook";
  clickHandler?: () => void;
}

const Button: FC<IButtonProps> = ({ content, theme, clickHandler }) => {
  if (theme === "filled") return <FilledButton>{content}</FilledButton>;
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
    text-green-500
    border-green-500
    hover:bg-red-500
    hover:text-white
    hover:border-transparent
  `}
`;

const FilledButton = styled(BaseButton)`
  ${tw`
    bg-red-500
    hover:bg-transparent
    hover:text-green-500
    hover:border-green-500
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
