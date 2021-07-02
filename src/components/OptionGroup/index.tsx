import { FC, useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleRight } from "react-icons/fa";
import MemberItem from "../MemberItem";

interface IOptionGroupProps {
  name: string;
  type: "members" | "media" | "files";
  // data: {}[];
}

const OptionGroup: FC<IOptionGroupProps> = ({ name, type }) => {
  const [checkDropDownGroup, setCheckDropDownGroup] = useState(false);
  const [rotateState, setRotateState] = useState(true);

  const iconRef = useRef<HTMLSpanElement>(null);

  const dropDownGroupHandler = () => {
    const icon = iconRef.current;

    setRotateState(!rotateState);
    setCheckDropDownGroup(!checkDropDownGroup);

    if (icon) {
      icon.style.transition = "all 0.2s ease-in-out";
      icon.style.transform = `rotate(${rotateState ? "90" : "0"}deg)`;
    }
  };

  return (
    <OptionGroupContainer>
      <OptionGroupInfo onClick={dropDownGroupHandler}>
        <Icon ref={iconRef}>
          <FaAngleRight />
        </Icon>
        <OptionGroupName>{name}</OptionGroupName>
      </OptionGroupInfo>

      {type === "members" && checkDropDownGroup ? (
        <MembersContainer>
          <MemberItem name="Quang Khai" active={true} avatar="" />
          <MemberItem name="Kkyler" active={true} avatar="" />
          <MemberItem name="bla bla bla" active={true} avatar="" />
        </MembersContainer>
      ) : null}
    </OptionGroupContainer>
  );
};

export default OptionGroup;

const OptionGroupContainer = styled.div`
  ${tw`
    flex
    flex-col
    py-2
    px-3
  `}
`;

const OptionGroupInfo = styled.div`
  ${tw`
    flex
    items-center
    cursor-pointer
    mb-2
    select-none
  `}

  &:hover {
    p {
      color: white;
      transition: all 0.3s ease-in-out;
    }
  }

  &:not(:hover) {
    p {
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Icon = styled.span`
  ${tw`
    text-base
    text-gray-400
    select-none
  `}
`;

const OptionGroupName = styled.p`
  ${tw`
    text-sm
    text-gray-400
    uppercase
    ml-1
    select-none
  `}
`;

const MembersContainer = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;
