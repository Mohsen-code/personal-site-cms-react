import {useParams} from 'react-router-dom';
import React, {useState, useEffect, useCallback} from "react";
import {Container, Grid, Box, Card, makeStyles, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {PostDAO} from "../DB/PostDAO";
import {PostDTO} from "../adapters/PostDTO";
import defaultImage from '../assets/images/no-image.jpg'
import {Comment} from "../components/Blog/Comment";
import ShowComment from "../components/include/ShowComment";
import {CommentDAO} from "../DB/CommentDAO";
import Message from "../components/include/Message";
import CustomButton from "../adapters/CustomButton";

const postDAO = new PostDAO();
const commentDAO = new CommentDAO();
const PrimaryButton = new CustomButton('primary');

const useStyle = makeStyles({
    container: {
        paddingTop: '20px'
    },
    card: {
        backgroundColor: "#292c31",
    },
    cardImage: {
        width: '100%'
    },
    tags: {
        backgroundColor: '#3b3f47',
        padding: '10px',
        border: '1px solid #171a1d'
    },
    colStyle: {
        margin: '0 auto'
    }
})

export const Post = () => {
    const classes = useStyle();
    const [post, setPost] = useState(new PostDTO());
    const [userWantToReply, setUserWantToReply] = useState(false)
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [replyCommentName, setReplyCommentName] = useState(null);
    const [commentsTrees, setCommentsTrees] = useState([])
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const params = useParams();
    const postId = params.id;

    const getPost = useCallback(async () => {
        const post = await postDAO.getPost(postId)
        setPost(new PostDTO(post))
    }, [])

    // Start Show Comments Functionality
    const getComment = useCallback(async (commentId) => {
        return await commentDAO.getComment(commentId)
    }, [])

    const createCommentsTree = useCallback(async (commentObject) => {
        commentObject.reply = await getComment(commentObject.replyId);
        if (commentObject.reply.isPublic && commentObject.reply.replyId) await createCommentsTree(commentObject.reply);
    }, [getComment])

    const initComments = useCallback(async (commentId) => {
        const comment = await getComment(commentId);
        if (comment.isPublic && comment.replyId) await createCommentsTree(comment);
        return comment;
    }, [getComment, createCommentsTree])
    // End Show Comments Functionality

    const getComments = useCallback(async () => {
        const comments = await commentDAO.getComments(true)
        const filteredComments = comments.filter(comment => comment.parentId === null)
        for (let i = 0; i < filteredComments.length; i++){
            const tree = await initComments(filteredComments[i].id)
            setCommentsTrees(prevState => {
                return [...prevState, tree]
            })
        }
    }, [])

    useEffect(() => {
        getPost();
    }, [])

    useEffect(() => {
        getComments();
    }, [])


    const handleReplyButtonOnClick = (commentID, commentName = null) => {
        setUserWantToReply(true);
        setReplyCommentId(commentID)
        setReplyCommentName(commentName)
    }

    const handleCreateComment = async (comment) => {
        if (replyCommentId) {
            comment.parentId = replyCommentId;
            const parentComment = await getComment(replyCommentId);
            parentComment.replyId = comment.id;
            commentDAO.updateComment(parentComment);
        }
        commentDAO.createComment(comment)
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment send successfully!']
            }
        })
    }


    const handleCancelReplyClickButton = () => {
        setUserWantToReply(false);
        setReplyCommentId(null)
        setReplyCommentName(null)
    }

    return (
        <Container className={classes.container}>
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
                <Grid item xs={12} md={8} className={classes.colStyle}>
                    <Card className={classes.card}>
                        <img src={post.thumbnail || defaultImage} className={classes.cardImage} alt="post-thumbnail"/>
                        <Box padding="10px">
                            <Typography variant="h4" component="h1">
                                {post.title}
                            </Typography>
                            <Typography variant="body1" component="p" dangerouslySetInnerHTML={{__html: post.content}}>
                            </Typography>
                        </Box>
                        <Box className={classes.tags}>
                            Tags: {post.tags.join(',')}
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} className={classes.colStyle}>
                    {commentsTrees.map(comment => {
                        return (<ShowComment key={comment.id} comment={comment} replyButtonOnClick={handleReplyButtonOnClick}/>)
                    })}
                </Grid>

                <Grid item xs={12} md={8} className={classes.colStyle}>
                    {replyCommentName && <Alert variant="filled" severity="info" action={
                        <PrimaryButton onClick={handleCancelReplyClickButton}>cancel</PrimaryButton>
                    }>
                        You're answering to <strong>{replyCommentName}</strong>
                    </Alert>}
                    <Comment postId={postId} createComment={handleCreateComment}/>
                </Grid>

            </Grid>
        </Container>
    )
}