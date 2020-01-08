/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, FC } from "react";
import Login from "./Login";
import { Route, RouteProps } from "react-router-dom";
import { wrapperLoginRouterStyle } from "./Login.styles";

interface ILoginRouterProps extends RouteProps {}

export const LoginRouter: FC<ILoginRouterProps> = ({ path, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        <Fragment>
          <div css={wrapperLoginRouterStyle} />
          <Login {...props} />
        </Fragment>
      )}
    />
  );
};
