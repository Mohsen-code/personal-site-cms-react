import {useEffect, useState} from "react";
import {Card, CardContent, CardActions, TextField, makeStyles, Grid, Box, Typography} from "@material-ui/core";
import FroalaEditor from 'react-froala-wysiwyg';
import {CommentDTO} from "../../adapters/CommentDTO";
import CustomButton from "../../adapters/CustomButton";

const useStyle = makeStyles({
    card: {
        backgroundColor: '#292c31',
        marginTop: '20px'
    }
})

const PrimaryButton = new CustomButton('primary');

export const Comment = ({postId, createComment}) => {
    const classes = useStyle();
    const [comment, setComment] = useState(new CommentDTO())

    useEffect(() => {
        if (postId) {
            setComment(prevState => {
                return {
                    ...prevState,
                    postId
                }
            })
        }
    }, [])

    const handleNameChanges = (event) => {
        const name = event.target.value.trim()
        setComment(prevState => {
            return {
                ...prevState,
                name
            }
        })
    }

    const handleEmailChanges = (event) => {
        const email = event.target.value.trim()
        setComment(prevState => {
            return {
                ...prevState,
                email
            }
        })
    }

    const handleContentChanges = (content) => {
        setComment(prevState => {
            return {
                ...prevState,
                content
            }
        })
    }

    const handleSendComment = () => {
        createComment(comment)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box margin="10px 5px 10px 0">
                            <TextField
                                label="Your Name"
                                value={comment.name}
                                onChange={handleNameChanges}
                                fullWidth
                            />
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box margin="10px 0 10px 5px">
                            <TextField
                                label="Your Email"
                                value={comment.email}
                                onChange={handleEmailChanges}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box margin="10px 0 0 0">
                            <Typography variant="h5">Content:</Typography>
                            <FroalaEditor tag='textarea' model={comment.content}
                                          onModelChange={handleContentChanges}/>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <PrimaryButton onClick={handleSendComment}>Send Comment</PrimaryButton>
            </CardActions>
        </Card>
    )
}