import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider, SwipeableDrawer } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightGreen } from "@material-ui/core/colors";
import Home from "./views/Home";
import AppContext from "./store/app-context";

function App() {
  const ctx = useContext(AppContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // type: prefersDarkMode ? "dark" : "light",
          type: "dark",
          background: {
            default: "#1b1d21",
            paper: '#1b1d21'
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SwipeableDrawer
        anchor="left"
        open={ctx.showDrawer}
        onOpen={() => ctx.toggleShowDrawer()}
        onClose={() => ctx.toggleShowDrawer()}
      >
        <h1>Hello World</h1>
      </SwipeableDrawer>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
