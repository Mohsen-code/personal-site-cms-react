import {useHistory, useRouteMatch} from 'react-router-dom'
import useUtil from "../../hooks/util";
import {
    Container,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    Box,
    Card,
    CardContent,
    makeStyles, Avatar
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import {PostDAO} from "../../DB/PostDAO";
import React, {useEffect, useState} from "react";
import CustomIconButton from "../../adapters/CustomIconButton";
import FAIcon from '../../components/include/FontAwesomeIcon';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "@material-ui/lab";
import Message from "../../components/include/Message";


const useStyles = makeStyles({
    paper: {
        backgroundColor: "#292c31",
    }
});

const postDAO = new PostDAO();

const PrimaryButton = new CustomButton('primary');
const WarningIconButton = new CustomIconButton('warning');
const ErrorIconButton = new CustomIconButton('error');

const Posts = () => {
    const classes = useStyles();
    const history = useHistory();
    const {path} = useRouteMatch();
    const util = useUtil();
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const PARENT_ROUTE = util.routeParent(path);

    const getPosts = async () => {
        const posts = await postDAO.getPosts();
        setPosts(posts)
    }

    useEffect(() => {
        getPosts();
    }, []);

    const handleDeletePost = (postId) => {
        postDAO.deletePost(postId).then(() => {
            setMessage(prevState => {
                return {
                    ...prevState,
                    show: true,
                    status: 'success',
                    messages: ['Post deleted successfully']
                }
            })
            getPosts();
        })
    }

    return (
        <Container>
            <Message
                show={message.show}
                onClose={() => {
                    setMessage(prevState => {
                        return {...prevState, show: false}
                    })
                }
                }
                messages={message.messages}
                duration={message.duration}
                status={message.status}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Box margin="20px 0">
                        <PrimaryButton onClick={() => history.push(`${PARENT_ROUTE}/new-post`)}>New
                            Post</PrimaryButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.paper}>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thumbnail</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Visit</TableCell>
                                            <TableCell>Comments</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {posts.length > 0 && <TableBody>
                                        {posts.map(post => {
                                            return (
                                                <TableRow key={post.id}>
                                                    <TableCell>
                                                        <Avatar src={post.thumbnail}/>
                                                    </TableCell>
                                                    <TableCell>{post.title}</TableCell>
                                                    <TableCell>{post.visits}</TableCell>
                                                    <TableCell>{post.comments.length}</TableCell>
                                                    <TableCell>
                                                        <WarningIconButton onClick={() => history.push(`${PARENT_ROUTE}/edit-post/${post.id}`)}>
                                                            <FAIcon icon={faEdit} fontSize="sm"/>
                                                        </WarningIconButton>
                                                        <ErrorIconButton onClick={() => handleDeletePost(post.id)}>
                                                            <FAIcon icon={faTrash} fontSize="sm"/>
                                                        </ErrorIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}
                                    {posts.length > 0 && <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={10}
                                                onPageChange={() => {
                                                }}
                                                page={1}
                                                rowsPerPage={5}
                                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                            />
                                        </TableRow>
                                    </TableFooter>}
                                </Table>
                            </TableContainer>
                            {posts.length === 0 && <Alert variant="filled" severity="error">There is no post!</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Posts;