import React from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";

import Posts from './Posts'
import Post from "./Post";
import {Categories} from "./Categories";
import Category from "./Category";

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
                <Route path={`${path}/categories`}>
                    <Categories/>
                </Route>
                <Route path={`${path}/new-category`}>
                    <Category/>
                </Route>
                <Route path={`${path}/edit-category/:id`}>
                    <Category/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;
