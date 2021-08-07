import React, {useState, useRef} from "react";
import {useHistory, useRouteMatch} from 'react-router-dom'
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Box,
    Divider,
    TextField,
    makeStyles,
    Typography, LinearProgress
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import {Editor} from '@tinymce/tinymce-react';
import noImage from '../../assets/images/no-image.jpg'
import {PostDAO} from "../../DB/PostDAO";
import useUtil from "../../hooks/util";
import {PostDTO} from "../../adapters/PostDTO";
import Dialog from '../../components/include/Dialog'
import Message from "../../components/include/Message";

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
    }
})

const postDAO = new PostDAO();

const PrimaryButton = new CustomButton('primary');
const ErrorButton = new CustomButton('error');

const Post = () => {
    const classes = useStyles();
    const [post, setPost] = useState(new PostDTO());
    const [tags, setTags] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const history = useHistory()
    const {path} = useRouteMatch()
    const util = useUtil()

    const editorRef = useRef(null);
    const fileRef = useRef();

    const handleFileChooserChanges = event => {
        if (!event.target.files) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0])
        fileReader.onload = () => {
            setPost(prevState => {
                return new PostDTO({...prevState, thumbnail: fileReader.result})
            })
        }
    }

    const handleFileChooser = () => {
        fileRef.current.click()
    }

    const handleTitleChanges = (event) => {
        setPost(prevState => {
            return new PostDTO({...prevState, title: event.target.value})
        })
    }

    const handleSummaryChanges = event => {
        setPost(prevState => {
            return new PostDTO({...prevState, summary: event.target.value})
        })
    }

    const handleTagsChanges = event => {
        setTags(event.target.value)
    }

    const handleCreateNewPost = () => {
        if (editorRef.current) {
            setShowDialog(true);
            const splitTags = tags.split(',');
            const content = editorRef.current.getContent()
            setPost(prevState => {
                return new PostDTO({
                    ...prevState,
                    content: content,
                    tags: splitTags
                })
            })

            postDAO.createPost(post)
            setTimeout(() => {
                setShowDialog(false);
                setMessage(prevState => {
                    return {
                        ...prevState,
                        show: true,
                        messages: ['Post created'],
                        status: "success"
                    }
                })
                setTimeout(() => {
                    history.push(`${util.routeParent(path)}/posts`)
                }, 2000)
            }, 2000)
        }
    }

    /*const resetForm = () => {
        setPost(new PostDTO());
        setTags("")
        editorRef.current.resetContent("")
    }*/

    return (
        <Container>
            <Dialog
                show={showDialog}
                handleClose={() => setShowDialog(false)}
                title="Please Wait">
                <LinearProgress/>
            </Dialog>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box>
                                <img src={post.thumbnail || noImage} style={{width: '100%'}} alt="thumbnail"/>
                            </Box>
                            <Box margin="10px 0">
                                <input type="file" ref={fileRef} onChange={handleFileChooserChanges} hidden/>
                                <PrimaryButton onClick={handleFileChooser}>Upload image</PrimaryButton>
                            </Box>
                            <Box>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={post.title}
                                    onChange={handleTitleChanges}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Summary"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    value={post.summary}
                                    onChange={handleSummaryChanges}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <Typography variant="h6">Content: </Typography>
                                <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue=""
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Tags"
                                    fullWidth
                                    value={tags}
                                    onChange={handleTagsChanges}
                                />
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions style={{justifyContent: "space-between"}}>
                            <PrimaryButton onClick={handleCreateNewPost}>Create</PrimaryButton>
                            <ErrorButton
                                onClick={() => history.push(`${util.routeParent(path)}/posts`)}>Cancel</ErrorButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
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
        </Container>
    )
}

export default Post;