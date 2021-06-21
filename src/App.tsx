import Home from "./pages/Home";
import styled from "styled-components";
import tw from "twin.macro";

function App() {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
  `}
`;
