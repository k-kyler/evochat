import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface IButtonProps {
  content: string;
  theme?:
    | "filled"
    | "filled-no-outlined"
    | "loading-filled-no-outlined"
    | "outlined"
    | "text-icon"
    | "google"
    | "facebook";
  color?: "red" | "blue" | "dark";
  icon?: any;
  disabled?: boolean;
  clickHandler?: () => void;
}

const Button: FC<IButtonProps> = ({
  content,
  theme,
  color,
  icon,
  clickHandler,
  disabled,
}) => {
  if (theme === "filled")
    return (
      <FilledButton color={color} onClick={clickHandler && clickHandler}>
        {content}
      </FilledButton>
    );
  if (theme === "loading-filled-no-outlined")
    return (
      <FilledNoOutlinedButton
        color={color}
        onClick={clickHandler && clickHandler}
        disabled={disabled}
        isDisabled={disabled}
      >
        {!disabled ? (
          content
        ) : (
          <DotsContainer>
            <Dot position="odd" />
            <Dot position="even" />
            <Dot position="odd" />
          </DotsContainer>
        )}
      </FilledNoOutlinedButton>
    );
  if (theme === "filled-no-outlined")
    return (
      <FilledNoOutlinedButton
        color={color}
        onClick={clickHandler && clickHandler}
        disabled={disabled}
        isDisabled={disabled}
      >
        {content}
      </FilledNoOutlinedButton>
    );
  if (theme === "text-icon")
    return (
      <TextButton color={color} onClick={clickHandler && clickHandler}>
        <Icon>{icon}</Icon>
        {content}
      </TextButton>
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
      : color === "dark"
      ? tw`
    text-black
    border-black
    hover:bg-black
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
      : color === "dark"
      ? tw`
    bg-black
    hover:text-black
    hover:border-black
      `
      : tw`
    bg-red-500
    hover:text-red-500
    hover:border-red-500
  `}
`;

const FilledNoOutlinedButton = styled(BaseButton)<{
  color?: string;
  isDisabled?: boolean;
}>`
  ${tw`
    text-white
  `}

  ${({ color }) =>
    color === "blue"
      ? tw`
    bg-blue-500
    hover:bg-blue-600
  `
      : color === "dark"
      ? tw`
    bg-black
    hover:bg-black
      `
      : tw`
    bg-red-500
    hover:bg-red-600
  `}

  ${({ isDisabled }) =>
    isDisabled &&
    tw`
    bg-blue-400
    hover:bg-blue-400
    cursor-not-allowed
  `}
`;

const DotsContainer = styled.div`
  ${tw`
    flex
    items-center
  `}

  div:not(:last-child) {
    ${tw`
      mr-2
    `}
  }
`;

const Dot = styled.div<{ position: "even" | "odd" }>`
  ${tw`
    w-2
    h-2
    bg-white
    m-1
  `}

  ${({ position }) =>
    position === "odd"
      ? css`
          animation: oddDot 0.5s linear infinite alternate;
        `
      : css`
          animation: evenDot 0.5s linear infinite alternate;
        `}

  @keyframes oddDot {
    from {
      transform: translateY(0.25rem);
    }
    to {
      transform: translateY(-0.25rem);
    }
  }

  @keyframes evenDot {
    from {
      transform: translateY(-0.25rem);
    }
    to {
      transform: translateY(0.25rem);
    }
  }
`;

const TextButton = styled(BaseButton)<{ color?: string }>`
  ${tw`
    flex
    items-center
    px-0
  `}

  ${({ color }) =>
    color === "blue"
      ? tw`
    text-blue-500
  `
      : color === "dark"
      ? tw`
    text-black
      `
      : tw`
    text-red-500    
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
