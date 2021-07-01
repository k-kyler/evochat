import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const OptionsList: FC = () => {
  return <OptionsListContainer></OptionsListContainer>;
};

export default OptionsList;

const OptionsListContainer = styled.div`
  ${tw`
    flex-1
    px-3
    py-4
  `}/* Chrome, Edge, and Safari */
  /* &::-webkit-scrollbar {
    width: 0.47rem;
  }

  &::-webkit-scrollbar-track {
    background: #2f3136;
    border-top: 1px solid rgba(4, 4, 5, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      bg-gray-500
      rounded-lg
    `}
  } */

  /* Firefox */
  /* scrollbar-width: auto;
  scrollbar-color: #6b7280 #2f3136; */
`;
