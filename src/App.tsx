import Home from "./pages/Home";
import styled from "styled-components";
import tw from "twin.macro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={SignIn} path="/signin" />
            <PrivateRoute exact component={Chat} path="/chat" />
          </Switch>
        </Router>
      </AppContainer>
    </AuthProvider>
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
