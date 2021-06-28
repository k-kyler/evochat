import styled from "styled-components";
import tw from "twin.macro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={SignIn} path="/signin" />
          <PrivateRoute exact component={Chat} path="/chat" />
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
