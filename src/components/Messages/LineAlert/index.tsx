import { FC } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface ILineAlertProps {
  content?: string;
}

const LineAlert: FC<ILineAlertProps> = ({ content }) => {
  return (
    <LineAlertContainer>
      <Content>{content}</Content>
    </LineAlertContainer>
  );
};

export default LineAlert;

const LineAlertContainer = styled.div`
  ${tw`
    w-full
    text-center
    text-xs
    border-b
    border-solid
    my-4
    text-gray-500
    pointer-events-none
    select-none
  `}

  line-height: 0.1em;
  border-color: #42454a;
`;

const Content = styled.span`
  ${tw`
    px-3
  `}

  background-color: #36393f;
`;
