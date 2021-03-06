import React from "react";
import { Route, Navigate } from "react-router-dom";
import session from "../services/Session";

export default function RoutePrivate({ children, ...rest }) {
  const loginPath = "/";
  return (
    <Route
      {...rest}
      render={({ location }) =>
        session.isValid() ? (
          children
        ) : (
            <Navigate
              to={{
                pathname: loginPath,
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}
