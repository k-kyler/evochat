import { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../../screens";

const PageLoading: FC = () => {
  return (
    <PageLoadingContainer>
      <InnerContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 508 508"
          version="1.1"
          viewBox="0 0 508 508"
          xmlSpace="preserve"
        >
          <circle cx="254" cy="254" r="254" fill="#36393f"></circle>
          <path
            fill="#2C9984"
            d="M420.4 214.4v108c0 21.6-17.6 39.2-39.2 39.2v50.8l-62-50.8H206c-21.6 0-39.2-17.6-39.2-39.2V300l21.6-18H302c21.6 0 39.2-17.6 39.2-39.2v-68h40c21.6.4 39.2 18 39.2 39.6z"
          ></path>
          <path
            fill="#FFF"
            d="M302 95.6H126.8c-21.6 0-39.2 17.6-39.2 39.2v108c0 21.6 17.6 39.2 39.2 39.2v50.8l62-50.8H302c21.6 0 39.2-17.6 39.2-39.2v-108c0-21.6-17.6-39.2-39.2-39.2z"
          ></path>
          <g fill="#84DBFF">
            <circle cx="141.6" cy="190" r="24.4"></circle>
            <circle cx="214.4" cy="190" r="24.4"></circle>
            <circle cx="286.8" cy="190" r="24.4"></circle>
          </g>
        </svg>

        <Spinner />
      </InnerContainer>
    </PageLoadingContainer>
  );
};

export default PageLoading;

const PageLoadingContainer = styled.div`
  ${tw`
    h-full
    w-full
    grid
    place-items-center
  `}

  background-color: #36393f;

  svg {
    height: 5rem;

    @media (min-width: ${SCREENS.md}) {
      height: 6rem;
    }

    @media (min-width: ${SCREENS.lg}) {
      height: 7rem;
    }

    @media (min-width: ${SCREENS["2xl"]}) {
      height: 8rem;
    }
  }

  g {
    animation: skeletonLoading 0.7s linear infinite alternate;

    @keyframes skeletonLoading {
      to {
        fill: #84dbff;
        fill-opacity: 0.5;
      }
    }
  }
`;

const InnerContainer = styled.div`
  ${tw`
    relative
    p-2
    flex
    items-center
    justify-center
  `}
`;

const Spinner = styled.div`
  ${tw`
    w-full
    h-full
    absolute
    animate-spin
  `}

  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: rgba(52, 211, 153, 0.8);
  border-left-color: #5dbb99;
`;
