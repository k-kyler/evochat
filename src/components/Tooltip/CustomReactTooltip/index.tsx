import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const CustomReactTooltip = () => {
  return (
    <CustomReactTooltipContainer
      place="right"
      type="dark"
      offset={{ left: -10 }}
      effect="solid"
      border={true}
      borderColor="black"
      arrowColor="black"
      backgroundColor="black"
    />
  );
};

export default CustomReactTooltip;

const CustomReactTooltipContainer = styled(ReactTooltip)`
  border-radius: 6px !important;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
`;
