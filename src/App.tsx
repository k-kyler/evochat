import Home from "./pages/Home";
import styled from "styled-components";
import tw from "twin.macro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={SignIn} path="/signin" />
        </Switch>
      </Router>
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
