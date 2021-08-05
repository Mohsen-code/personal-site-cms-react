import {v4 as uuid} from 'uuid'
import {useState, useRef} from "react";
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
    Typography
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import {Editor} from '@tinymce/tinymce-react';
import noImage from '../../assets/images/no-image.jpg'
import LocalStorage from "../../adapters/LocalStorage";

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // width: '93%'
    }
})

let ls = new LocalStorage("app-posts");

const Post = () => {
    const classes = useStyles();
    const PrimaryButton = new CustomButton('primary');
    const ErrorButton = new CustomButton('error');
    const [editorState, setEditorState] = useState("");
    const [thumbnail, setThumbnail] = useState(null)
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");


    const editorRef = useRef(null);
    const fileRef = useRef();

    const handleFileChooserChanges = event => {
        if (!event.target.files) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0])
        fileReader.onload = () => {
            setThumbnail(fileReader.result)
        }
    }

    const handleFileChooser = () => {
        fileRef.current.click()
    }

    const handleTitleChanges = (event) => {
        setTitle(event.target.value);
    }

    const handleSummaryChanges = event => {
        setSummary(event.target.value);
    }

    const handleTagsChanges = event => {
        setTags(event.target.value)
    }

    const handleCreateNewPost = () => {
        if (editorRef.current) {
            const post = {
                id: uuid().replace(/-/g, ""),
                thumbnail,
                title,
                summary,
                content: editorRef.current.getContent(),
                tags
            }

            ls.addItem(post);
            resetForm()
        }
    }

    const resetForm = () => {
        setThumbnail(null)
        setTitle("")
        setSummary("")
        setTags("")
        editorRef.current.resetContent("")
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box>
                                <img src={thumbnail ? thumbnail : noImage} style={{width: '100%'}}/>
                            </Box>
                            <Box margin="10px 0">
                                <input type="file" ref={fileRef} onChange={handleFileChooserChanges} hidden/>
                                <PrimaryButton onClick={handleFileChooser}>Upload image</PrimaryButton>
                            </Box>
                            <Box>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={title}
                                    onChange={handleTitleChanges}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Summary"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    value={summary}
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
                            <ErrorButton>Cancel</ErrorButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Post;