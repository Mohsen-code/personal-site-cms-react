import React, {useState, useRef, useEffect, useCallback} from "react";
import {useHistory, useRouteMatch, useParams} from 'react-router-dom'
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
    Typography, LinearProgress, InputLabel, Select, FormControl, MenuItem, ListItemText, Input
} from "@material-ui/core";
import CustomButton from "../../adapters/CustomButton";
import noImage from '../../assets/images/no-image.jpg'
import {PostDAO} from "../../DB/PostDAO";
import useUtil from "../../hooks/util";
import {PostDTO} from "../../adapters/PostDTO";
import Dialog from '../../components/include/Dialog'
import Message from "../../components/include/Message";

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import '@fortawesome/fontawesome-free/css/fontawesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import {CategoryDAO} from "../../DB/CategoryDAO";
import {CategoryDTO} from "../../adapters/CategoryDTO";
import CustomCheckbox from "../../adapters/CustomCheckbox";

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: "#292c31",
    },
    formControl: {
        width: '100%'
    }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const postDAO = new PostDAO();
const categoryDAO = new CategoryDAO();

const PrimaryButton = new CustomButton('primary');
const ErrorButton = new CustomButton('error');
const PrimaryCheckbox = new CustomCheckbox('primary');

const Post = () => {
    const classes = useStyles();
    const [post, setPost] = useState(new PostDTO());
    const [tags, setTags] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const history = useHistory()
    const {path} = useRouteMatch()
    const util = useUtil()
    const params = useParams();
    const postId = params.id;
    const editMode = !!params.id;
    const fileRef = useRef();


    const getPost = useCallback(async (postId) => {
        const post = await postDAO.getPost(postId);
        setPost(post)
        setTags(post.tags.join(','))
    }, [])

    useEffect(() => {
        categoryDAO.getCategories().then(categories => {
            const mappedCategories = categories.map(category => new CategoryDTO(category))
            setCategories(mappedCategories)
        })
    }, [])

    useEffect(() => {
        if (editMode) {
            getPost(postId)
        }
    }, [postId, editMode, getPost])

    useEffect(() => {
        if (editMode) {
            const categoriesTitle = util.mapSpecificDataFromArray(post.categories, categories, 'id', 'title');
            setSelectedCategories(categoriesTitle)
        }
    }, [categories, editMode, post.categories, util])


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

    const handleContentChanges = content => {
        setPost(prevState => {
            return {
                ...prevState,
                content: content
            }
        })
    }

    const handleTagsChanges = event => {
        setTags(event.target.value)
    }

    const handleSetTags = event => {
        const content = event.target.value.trim();
        if (content.length > 0) setPost(prevState => {
            return {
                ...prevState,
                tags: content.split(',')
            }
        })
    }

    const selectedCategoriesChanged = (event) => {
        setSelectedCategories(event.target.value)
    };

    const handleSetCategoriesToPostObject = () => {
        const categoriesId = util.mapSpecificDataFromArray(selectedCategories, categories, 'title', 'id');
        setPost(prevState => {
            return {
                ...prevState,
                categories: categoriesId
            }
        })
    }

    const handleCreateNewPost = () => {
        setShowDialog(true);
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

    const handleUpdatePost = () => {
        setShowDialog(true);
        postDAO.updatePost(post)
        setTimeout(() => {
            setShowDialog(false);
            setMessage(prevState => {
                return {
                    ...prevState,
                    show: true,
                    messages: ['Post updated successfully!'],
                    status: "success"
                }
            })
            setTimeout(() => {
                history.push(`/panel/posts`)
            }, 2000)
        }, 2000)
    }

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
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="categories-label">Category</InputLabel>
                                    <Select
                                        labelId="categories-label"
                                        id="multiple-category"
                                        multiple
                                        value={selectedCategories}
                                        onChange={selectedCategoriesChanged}
                                        onBlur={handleSetCategoriesToPostObject}
                                        input={<Input/>}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        fullWidth
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.title}>
                                                <PrimaryCheckbox
                                                    checked={selectedCategories.indexOf(category.title) > -1}/>
                                                <ListItemText primary={category.title}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                <FroalaEditor tag='textarea' model={post.content} onModelChange={handleContentChanges}/>
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Tags"
                                    fullWidth
                                    value={tags}
                                    onChange={handleTagsChanges}
                                    onBlur={handleSetTags}
                                />
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions style={{justifyContent: "space-between"}}>
                            <PrimaryButton onClick={editMode ? handleUpdatePost : handleCreateNewPost}>
                                {editMode ? 'Update' : 'Create'}
                            </PrimaryButton>
                            <ErrorButton
                                onClick={() => history.push(`/panel/posts`)}>Cancel</ErrorButton>
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