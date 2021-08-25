import {useHistory} from 'react-router-dom'
import {Container, Grid, Card, CardContent, makeStyles, Typography, CardActions, Divider} from "@material-ui/core";
import {PostDAO} from "../DB/PostDAO";
import {useEffect, useState} from "react";
import CustomButton from "../adapters/CustomButton";

const postDAO = new PostDAO();
const LOAD_MORE_ROUTE = '/post/'

const useStyle = makeStyles({
    container: {
      paddingTop: '20px'
    },
    card: {
        backgroundColor: "#292c31",
        margin: '0 7px 15px 7px'
    },

    postImage: {
        width: '100%'
    }
})

const PrimaryButton = new CustomButton('primary');

const Blog = () => {
    const classes = useStyle();
    const [posts, setPosts] = useState([])
    const history = useHistory()

    const getPosts = async () => {
        const posts = await postDAO.getPosts();
        setPosts(posts)
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Container className={classes.container}>
            <Grid container>
                {posts.map(post => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={post.id}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <img src={post.thumbnail} className={classes.postImage} alt={'thumbnail'}/>
                                    <Typography variant="h4" component="h1">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        {post.summary}
                                    </Typography>
                                </CardContent>
                                <Divider/>
                                <CardActions>
                                    <PrimaryButton onClick={() => history.push(LOAD_MORE_ROUTE + post.id)}>Read More</PrimaryButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </Container>
    )
}

export default Blog;