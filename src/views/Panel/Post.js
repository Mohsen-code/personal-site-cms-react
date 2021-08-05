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

const Post = () => {
    const classes = useStyles();
    const PrimaryButton = new CustomButton('primary');
    const ErrorButton = new CustomButton('error');
    const [editorState, setEditorState] = useState("");

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleCreateNewPost = () => {
        console.log('editorState => ', editorState.toJS())
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Box margin="10px 0">
                                <PrimaryButton>Upload image</PrimaryButton>
                            </Box>
                            <Box>
                                <TextField
                                    label="Title"
                                    fullWidth
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Summary"
                                    fullWidth
                                    multiline
                                    rows={5}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <Typography variant="h6">Content: </Typography>
                                <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                <button onClick={log}>Log editor content</button>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions>
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