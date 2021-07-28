import { FC, useState, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaAngleRight } from "react-icons/fa";
import MemberItem from "./MemberItem";
import FileItem from "./FileItem";
import MediaItem from "./MediaItem";
import { MemberItemType } from "../../../typings/MemberItemType";
import { SharedMediaType, SharedFileType } from "../../../typings/SharedType";

interface IOptionGroupProps {
  name: string;
  type: "members" | "media" | "files";
  members?: MemberItemType[];
  media?: SharedMediaType[];
  files?: SharedFileType[];
}

const OptionGroup: FC<IOptionGroupProps> = ({
  name,
  type,
  members,
  media,
  files,
}) => {
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
        <MemberItemsContainer>
          {members?.map((member) => (
            <MemberItem
              key={member.uid}
              uid={member.uid}
              oid={member.oid}
              username={member.username}
              avatar={member.avatar}
              active={true}
            />
          ))}
        </MemberItemsContainer>
      ) : type === "media" && checkDropDownGroup ? (
        <MediaItemsContainer>
          {media?.map((m) => (
            <MediaItem key={m.id} {...m} />
          ))}
        </MediaItemsContainer>
      ) : type === "files" && checkDropDownGroup ? (
        <FileItemsContainer>
          {files?.map((file) => (
            <FileItem key={file.id} {...file} />
          ))}
        </FileItemsContainer>
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

const MemberItemsContainer = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

const MediaItemsContainer = styled.div`
  ${tw`
    grid
    grid-cols-3
    gap-3
    place-items-center
    py-2
  `}
`;

const FileItemsContainer = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;
