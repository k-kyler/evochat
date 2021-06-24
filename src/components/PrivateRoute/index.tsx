import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default PrivateRoute;
