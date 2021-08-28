import avatarImage from "../../assets/images/4.jpg";
import {
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    makeStyles,
    Container,
    Box,
} from "@material-ui/core";
import {faUser, faEnvelope, faInbox, faComments, faMailBulk} from "@fortawesome/free-solid-svg-icons";
import FAIcon from "../../components/include/FontAwesomeIcon";
import TodoList from "../../components/Panel/Dashboard/TodoList";
import React, {useEffect, useContext, useState, useCallback} from "react";
import AppContext from "../../store/app-context";
import {PostDAO} from "../../DB/PostDAO";
import {CommentDAO} from "../../DB/CommentDAO";
import {MessageDAO} from "../../DB/MessageDAO";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#292c31",
    },
});

const postDAO = new PostDAO();
const commentDAO = new CommentDAO();
const messageDAO = new MessageDAO();

const Dashboard = () => {
    const classes = useStyles();
    const {account} = useContext(AppContext)
    const [postsCount, setPostsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [messagesCount, setMessagesCount] = useState(0);

    const getPostsAndCommentsAndMessagesCount = useCallback(async () => {
        setPostsCount(await postDAO.getPostsCount())
        setCommentsCount(await commentDAO.getCommentsCount())
        setMessagesCount(await messageDAO.getMessagesCountByStatus())
    }, [])
    useEffect(() => {
        getPostsAndCommentsAndMessagesCount()
    }, [getPostsAndCommentsAndMessagesCount])

    return (
        <Container>
            <Box padding="20px 0 0 0">
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <img src={avatarImage} style={{width: "100%"}} alt="avatar"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box padding="0 0 0 0">
                                            <List>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <FAIcon icon={faUser} fontSize="lg"/>
                                                    </ListItemIcon>
                                                    <ListItemText>Name: {account.firstName} {account.lastName}</ListItemText>
                                                </ListItem>
                                                <Divider/>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <FAIcon icon={faEnvelope} fontSize="lg"/>
                                                    </ListItemIcon>
                                                    <ListItemText>Email: {account.email}</ListItemText>
                                                </ListItem>
                                                {account.permission === 'admin' && <React.Fragment>
                                                    <Divider/>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <FAIcon icon={faInbox} fontSize="lg"/>
                                                        </ListItemIcon>
                                                        <ListItemText>Posts Number: {postsCount}</ListItemText>
                                                    </ListItem>
                                                    <Divider/>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <FAIcon icon={faComments} fontSize="lg"/>
                                                        </ListItemIcon>
                                                        <ListItemText>Comments Number: {commentsCount}</ListItemText>
                                                    </ListItem>
                                                    <Divider/>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <FAIcon icon={faMailBulk} fontSize="lg"/>
                                                        </ListItemIcon>
                                                        <ListItemText>Messages Number: {messagesCount}</ListItemText>
                                                    </ListItem>
                                                </React.Fragment>}

                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} style={{margin: '20px 0'}}>
                        <TodoList/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
