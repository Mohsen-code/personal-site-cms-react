import {Link} from 'react-router-dom'
import Message from "../../components/include/Message";
import {
    Box,
    Card,
    CardContent, Container, FormControlLabel,
    Grid, makeStyles, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@material-ui/core";
import FAIcon from "../../components/include/FontAwesomeIcon";
import {faTrash, faEye} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "@material-ui/lab";
import React, {useCallback, useEffect, useState} from "react";
import {CommentDAO} from "../../DB/CommentDAO";
import CustomIconButton from "../../adapters/CustomIconButton";
import {PostDAO} from "../../DB/PostDAO";
import {CommentDialog} from "../../components/Panel/Comments/CommentDialog";
import {useComments} from "../../hooks/comments";

const commentDAO = new CommentDAO();
const postDAO = new PostDAO();

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
    },
    postLink: {
        textDecoration: 'none',
        color: '#1976d2'
    }
});

const WarningIconButton = new CustomIconButton('warning');
const ErrorIconButton = new CustomIconButton('error');
const PrimaryIconButton = new CustomIconButton('primary');

export const Comments = () => {
    const classes = useStyles()
    const [commentsSwitch, setCommentsSwitch] = useState(false)
    const [comments, setComments] = useState([])
    const [commentId, setCommentId] = useState(null)
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const [showDialog, setShowDialog] = useState(false);
    const {deleteCommentAndRepliesFromIndexedDB} = useComments()

    const mapPostIdToPostTitle = useCallback(async (postId) => {
        const post = await postDAO.getPost(postId)
        return post.title;
    }, [])

    const getComments = useCallback(async (isPublic = false) => {
        const comments = await commentDAO.getComments(isPublic)
        const mappedComments = [];
        for (let i = 0; i < comments.length; i++) {
            let postTitle = ''
            if (comments[i].postId) postTitle = await mapPostIdToPostTitle(comments[i].postId);
            mappedComments.push({
                ...comments[i],
                postTitle
            })
        }
        setComments(mappedComments);
    }, [])

    useEffect(() => {
        getComments(false)
    }, [getComments])

    const handleDeleteComment = (comment) => {
        // commentDAO.deleteComment(comment.id)
        deleteCommentAndRepliesFromIndexedDB(comment)
        setComments(prevState => {
            const filteredComments = prevState.filter(commentArg => commentArg.id !== comment.id)
            return [...filteredComments];
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment deleted successfully!']
            }
        })
    }


    const handleOpenComment = (commentId) => {
        setCommentId(commentId)
        setShowDialog(true)
    }

    const handleCommentsSwitchChanges = () => {
        setCommentsSwitch(prevState => !prevState)
        getComments(!commentsSwitch);
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

            {showDialog && <CommentDialog showDialog={showDialog} setShowDialog={setShowDialog} commentId={commentId}/>}

            <Grid container>
                <Grid item xs={12}>
                    <Box margin="20px 0">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={commentsSwitch}
                                    onChange={handleCommentsSwitchChanges}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Published Comments"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Post</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {comments.length > 0 && <TableBody>
                                        {comments.map(comment => {
                                            return (
                                                <TableRow key={comment.id}>
                                                    <TableCell>{comment.name || ''}</TableCell>
                                                    <TableCell>{comment.email || ''}</TableCell>
                                                    <TableCell>{<Link to={`/post/${comment.id}`} className={classes.postLink}>{comment.postTitle}</Link> || ''}</TableCell>
                                                    <TableCell>
                                                        <ErrorIconButton
                                                            onClick={() => handleDeleteComment(comment)}>
                                                            <FAIcon icon={faTrash} fontSize="sm"/>
                                                        </ErrorIconButton>
                                                        <PrimaryIconButton
                                                            onClick={() => handleOpenComment(comment.id)}>
                                                            <FAIcon icon={faEye} fontSize="sm"/>
                                                        </PrimaryIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}
                                    {comments.length > 0 && <TableFooter>
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
                            {comments.length === 0 &&
                            <Alert variant="filled" severity="error">There is no post!</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}