import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  SwipeableDrawer,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  withStyles,
} from "@material-ui/core";
import AppContext from "./store/app-context";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import ColorPaletteIcon from "@material-ui/icons/Palette";
import EmailIcon from "@material-ui/icons/Email";
import FAIcon from "./components/include/FontAwesomeIcon";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#13151a",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
  },
  appBar: {
    // width: '100vw'
    backgroundColor: "#13151a",
    fontSize: "12px",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const CustomBottomNavigationAction = withStyles({
  selected: {
    // backgroundColor: "#a0d468",
    color: "#a0d468 !important",
  },
})(BottomNavigationAction);

const ViewsWrapper = ({ children }) => {
  const ctx = useContext(AppContext);
  const classes = useStyles();
  const [value, setValue] = React.useState("Home");

  const history = useHistory();
  const route = useLocation();

  useEffect(() => {
    switch (route.pathname) {
      case "/":
        setValue("Home");
        break;
      case "/login":
      case "/register":
        setValue("Login");
        break;
      case "/blog":
        setValue("Blog");
        break;
      default:
        throw new Error("route not found!");
    }
  }, [route.pathname]);

  const handleBottomNavigation = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case "Home":
        history.push("/");
        break;
      case "Login":
        history.push("/login");
        break;
      case "Blog":
        history.push("/blog");
        break;
      default:
        throw new Error("route not found!");
    }
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={ctx.showDrawer}
        onOpen={() => ctx.toggleShowDrawer()}
        onClose={() => ctx.toggleShowDrawer()}
      >
        <h1>Hello World</h1>
      </SwipeableDrawer>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={ctx.toggleShowDrawer}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="subtitle2" className={classes.title}>
            Mohsen App
          </Typography>
          <Box component="div"></Box>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <LanguageIcon fontSize="small" />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <ColorPaletteIcon fontSize="small" />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <EmailIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ margin: "56px 0" }}>{children}</div>
      <BottomNavigation
        value={value}
        onChange={handleBottomNavigation}
        className={classes.root}
      >
        <CustomBottomNavigationAction
          label={route.pathname === '/login' ? 'login' : 'register'}
          value="Login"
          icon={<FAIcon icon={faUser} fontSize="lg" />}
        />
        <CustomBottomNavigationAction
          label="Home"
          value="Home"
          icon={<FAIcon icon={faHome} fontSize="lg" />}
        />
        <CustomBottomNavigationAction
          label="Blog"
          value="Blog"
          icon={<FAIcon icon={faBloggerB} fontSize="lg" />}
        />
      </BottomNavigation>
    </React.Fragment>
  );
};

export default ViewsWrapper;
