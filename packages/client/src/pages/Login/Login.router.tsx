import React from "react";
import Login from "./Login";
import { Route, RouteChildrenProps, RouteProps } from "react-router-dom";

interface ILoginRouterProps extends RouteProps {}

export const LoginRouter: React.FC<ILoginRouterProps> = ({ path, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        <>
          <div
            style={{
              // backgroundImage: "url(kosmos.jpg)",
              backgroundColor: "midnightblue",
              filter: "brightness(0.3)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%"
            }}
          />
          <Login {...props} />
        </>
      )}
    />
  );
};
