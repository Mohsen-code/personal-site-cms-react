import React, {useEffect, useContext} from "react";
import {Switch, Route, useRouteMatch, useHistory} from "react-router-dom";
import Dashboard from "./Dashboard";

import Posts from './Posts'
import Post from "./Post";
import {Categories} from "./Categories";
import Category from "./Category";
import {Comments} from "./Comments";
import LocalStorage from "../../adapters/LocalStorage";
import AppContext from "../../store/app-context";
const Index = () => {
    let {path} = useRouteMatch();
    const ctx = useContext(AppContext)
    const history = useHistory()

    const checkUserDataExpireDate = () => {
        const userData = new LocalStorage("app-user-data").getUserData();
        const currentDate = new Date().getTime()
        if (!userData.expireDate || currentDate > userData.expireDate){
            localStorage.removeItem("app-user-data")
            ctx.setIsUserLoggedIn(false)
            history.push('/login')
        }
    }

    useEffect(() => {
        checkUserDataExpireDate()
    }, [])

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
                <Route path={`${path}/comments`}>
                    <Comments/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;
