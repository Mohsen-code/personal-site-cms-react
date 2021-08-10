import {useParams} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {Container, Grid, Box, Card, makeStyles, Typography} from "@material-ui/core";
import {PostDAO} from "../DB/PostDAO";
import {PostDTO} from "../adapters/PostDTO";
import defaultImage from '../assets/images/no-image.jpg'
import {Comment} from "../components/Blog/Comment";
import {ShowComment} from "../components/Blog/ShowComment";
import {CommentDAO} from "../DB/CommentDAO";
import Message from "../components/include/Message";

const postDAO = new PostDAO();
const commentDAO = new CommentDAO();

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
    }
})

export const Post = () => {
    const classes = useStyle();
    const [post, setPost] = useState(new PostDTO());
    const [comments, setComments] = useState([])
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const params = useParams();
    const postId = params.id;

    const getPost = async () => {
        const post = await postDAO.getPost(postId)
        setPost(new PostDTO(post))
    }

    const getComments = async () => {
        const comments = await commentDAO.getComments(true)
        console.log('comments => ', comments)
        setComments(comments)
    }

    useEffect(() => {
        getPost();
    }, [])

    useEffect(() => {
        getComments();
    }, [])

    const handleCreateComment = (comment) => {
        commentDAO.createComment(comment)
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Comment send successfully!']
            }
        })
        getComments();
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Comment postId={postId} createComment={handleCreateComment}/>
                </Grid>

                <Grid item xs={12}>
                    {comments.map(comment => {
                        return (<ShowComment key={comment.id} comment={comment}/>)
                    })}
                </Grid>
            </Grid>
        </Container>
    )
}