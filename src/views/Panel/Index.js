import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const Index = () => {
  let { path, url } = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path}>
          <Dashboard/>
        </Route>
        <Route path={`${path}/test`}>
            <h1>Hello World</h1>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Index;
