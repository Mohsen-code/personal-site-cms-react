import React, {useContext, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
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
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Avatar,
    withStyles,
} from "@material-ui/core";
import AppContext from "./store/app-context";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import ColorPaletteIcon from "@material-ui/icons/Palette";
import EmailIcon from "@material-ui/icons/Email";
import FAIcon from "./components/include/FontAwesomeIcon";
import {
    faHome,
    faUser,
    faUserPlus,
    faThLarge,
    faEdit,
    faSitemap,
    faComments,
    faSignOutAlt, faList, faInbox, faUsers, faIdCard
} from "@fortawesome/free-solid-svg-icons";
import {faBloggerB} from "@fortawesome/free-brands-svg-icons";
import avatar from './assets/images/no-image.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#13151a",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        zIndex: 3
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

const ViewsWrapper = ({children}) => {
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
            case "/register":
            case "/login":
                setValue("Login");
                break;
            case "/panel":
                setValue("Panel");
                break;
            case "/blog":
                setValue("Blog");
                break;
            default:
                console.log("hey2");
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
            case "Panel":
                history.push("/panel");
                break;
            default:
                console.log("hey");
        }
    };

    const handleDrawerMenuClick = (path) => {
        history.push(`/${path}`);
        ctx.toggleShowDrawer();
    }

    let userIconLabel = "Login";
    if (route.pathname === "/register") userIconLabel = "Register";
    if (route.pathname === "/panel") userIconLabel = "Panel";

    const handleClickOnSigOut = () => {
        localStorage.removeItem("app-user-data");
        history.push('/login')
        ctx.toggleShowDrawer()
        ctx.setIsUserLoggedIn(false)
    }

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor="left"
                open={ctx.showDrawer}
                onOpen={() => ctx.toggleShowDrawer()}
                onClose={() => ctx.toggleShowDrawer()}
            >
                <Box width="260px" display="flex">
                    <Box padding="10px">
                        {/*<img src={avatar} style={{width: '65px', height: '65px', borderRadius: '100%'}}/>*/}
                        <Avatar src={ctx.account.thumbnail || avatar}/>
                    </Box>
                    <Box flex="1" display="flex" flexDirection="row" alignItems="center" flexWrap="wrap">
                        <div>
                            <Typography variant="h6" style={{flexBasis: '100%', margin: '0'}}>Mohsen</Typography>
                            <Typography variant="subtitle2"
                                        style={{flexBasis: '100%', margin: '0'}}>test@gmail.com</Typography>
                        </div>
                    </Box>
                </Box>
                <Divider/>
                <List>
                    {/*<ListItem button onClick={() => handleDrawerMenuClick('')}>
                        <ListItemIcon>
                            <FAIcon icon={faHome} fontSize="lg"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h6">Home</Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => handleDrawerMenuClick('blog')}>
                        <ListItemIcon>
                            <FAIcon icon={faBloggerB} fontSize="lg"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h6">Blog</Typography>
                        </ListItemText>
                    </ListItem>*/}
                    {!ctx.isUserLoggedIn && <React.Fragment>
                        <ListItem button onClick={() => handleDrawerMenuClick('login')}>
                            <ListItemIcon>
                                <FAIcon icon={faUser} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Login</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => handleDrawerMenuClick('register')}>
                            <ListItemIcon>
                                <FAIcon icon={faUserPlus} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Register</Typography>
                            </ListItemText>
                        </ListItem>
                    </React.Fragment>}
                    {ctx.isUserLoggedIn && <React.Fragment>
                        <ListItem button onClick={() => handleDrawerMenuClick('panel')}>
                            <ListItemIcon>
                                <FAIcon icon={faThLarge} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Dashboard</Typography>
                            </ListItemText>
                        </ListItem>
                        {
                            ctx.account.permission === 'admin' && <React.Fragment>
                                <ListItem button onClick={() => handleDrawerMenuClick('panel/posts')}>
                                    <ListItemIcon>
                                        <FAIcon icon={faEdit} fontSize="lg"/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="h6">Posts</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem button onClick={() => handleDrawerMenuClick('panel/categories')}>
                                    <ListItemIcon>
                                        <FAIcon icon={faSitemap} fontSize="lg"/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="h6">Categories</Typography>
                                    </ListItemText>
                                </ListItem>
                                <ListItem button onClick={() => handleDrawerMenuClick('panel/comments')}>
                                    <ListItemIcon>
                                        <FAIcon icon={faComments} fontSize="lg"/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="h6">Comments</Typography>
                                    </ListItemText>
                                </ListItem>
                            </React.Fragment>
                        }
                        <ListItem button onClick={() => handleDrawerMenuClick('panel/todos')}>
                            <ListItemIcon>
                                <FAIcon icon={faList} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Todo Management</Typography>
                            </ListItemText>
                        </ListItem>
                        {ctx.account.permission === 'admin' && <React.Fragment>
                            <ListItem button onClick={() => handleDrawerMenuClick('panel/messages')}>
                                <ListItemIcon>
                                    <FAIcon icon={faInbox} fontSize="lg"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="h6">Messages</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem button onClick={() => handleDrawerMenuClick('panel/users')}>
                                <ListItemIcon>
                                    <FAIcon icon={faUsers} fontSize="lg"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography variant="h6">Users</Typography>
                                </ListItemText>
                            </ListItem>
                        </React.Fragment>}
                        <ListItem button onClick={() => handleDrawerMenuClick('panel/profile')}>
                            <ListItemIcon>
                                <FAIcon icon={faIdCard} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Profile</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleClickOnSigOut}>
                            <ListItemIcon>
                                <FAIcon icon={faSignOutAlt} fontSize="lg"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="h6">Sign Out</Typography>
                            </ListItemText>
                        </ListItem>
                    </React.Fragment>}

                </List>
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
                        <MenuIcon fontSize="small"/>
                    </IconButton>
                    <Typography variant="subtitle2" className={classes.title}>
                        Mohsen App
                    </Typography>
                    <Box component="div"></Box>
                    {/*<IconButton edge="end" color="inherit" aria-label="menu">
                        <LanguageIcon fontSize="small"/>
                    </IconButton>
                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <ColorPaletteIcon fontSize="small"/>
                    </IconButton>*/}
                    <IconButton edge="end" color="inherit" aria-label="menu"
                                onClick={() => history.push('/contact-us')}>
                        <EmailIcon fontSize="small"/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div style={{margin: "56px 0"}}>{children}</div>
            <BottomNavigation
                value={value}
                onChange={handleBottomNavigation}
                className={classes.root}
            >
                {ctx.isUserLoggedIn && <CustomBottomNavigationAction
                    label={userIconLabel}
                    value="Panel"
                    icon={<FAIcon icon={faThLarge} fontSize="lg"/>}
                />}
                {!ctx.isUserLoggedIn && <CustomBottomNavigationAction
                    label={userIconLabel}
                    value="Login"
                    icon={<FAIcon icon={faUser} fontSize="lg"/>}
                />}
                <CustomBottomNavigationAction
                    label="Home"
                    value="Home"
                    icon={<FAIcon icon={faHome} fontSize="lg"/>}
                />
                <CustomBottomNavigationAction
                    label="Blog"
                    value="Blog"
                    icon={<FAIcon icon={faBloggerB} fontSize="lg"/>}
                />
            </BottomNavigation>
        </React.Fragment>
    );
};

export default ViewsWrapper;
