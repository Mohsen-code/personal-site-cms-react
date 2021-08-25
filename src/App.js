import React, {useEffect, useContext} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./views/Home";
import Blog from "./views/Blog";
import Login from "./views/Login";
import Register from "./views/Register";
import Panel from "./views/Panel/Index";
import {Post} from "./views/Post";

import {createTheme, ThemeProvider} from "@material-ui/core";
import ViewsWrapper from "./ViewsWrapper";
import CssBaseline from "@material-ui/core/CssBaseline";
import {lightGreen} from "@material-ui/core/colors";
import LocalStorage from "./adapters/LocalStorage";
import AppContext from "./store/app-context";
import {AccountDAO} from "./DB/AccountDAO";
import {AccountDTO} from "./adapters/AccountDTO";

function App() {
    const ctx = useContext(AppContext)
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    // type: prefersDarkMode ? "dark" : "light",
                    type: "dark",
                    background: {
                        default: "#1b1d21",
                        paper: "#1b1d21",
                        // paper: "#292c31",
                    },
                    text: {
                        primary: "#fff",
                        secondary: "#898989",
                        green: lightGreen[600],
                    },
                },
            }),
        []
    );

    const init = async () => {
        const userData = new LocalStorage("app-user-data").getUserData();
        const currentDate = new Date().getTime()
        if (userData.expireDate && currentDate < userData.expireDate) {
            const accountDAO = new AccountDAO();
            const account = new AccountDTO(await accountDAO.getAccountById(userData.id))
            ctx.setIsUserLoggedIn(true);
            ctx.setAccount(account)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <ViewsWrapper>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/blog" exact>
                            <Blog/>
                        </Route>
                        <Route path="/post/:id" exact>
                            <Post/>
                        </Route>
                        <Route path="/login" exact>
                            <Login/>
                        </Route>
                        <Route path="/register" exact>
                            <Register/>
                        </Route>
                        <Route path="/panel">
                            <Panel/>
                        </Route>
                    </ViewsWrapper>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
