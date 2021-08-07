import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";

import Posts from './Posts'
import Post from "./Post";

const Index = () => {
    let {path} = useRouteMatch();

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
                <Route path={`${path}/edit-post/:id`}>
                    <Post/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;
