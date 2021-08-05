import React from "react";
import {Switch, Route, useRouteMatch, Link} from "react-router-dom";
import Dashboard from "./Dashboard";

import Posts from './Posts'
import Post from "./Post";

const Index = () => {
    let {path, url} = useRouteMatch();

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={path}>
                    <Dashboard/>
                </Route>
                <Route path={`${path}/posts`}>
                    <Posts/>
                </Route>
                <Route path={`${path}/new-post`}>
                    <Post/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;
