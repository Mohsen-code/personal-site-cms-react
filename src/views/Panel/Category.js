import React, {useState, useRef, useEffect, useCallback} from "react";
import {useHistory, useParams} from 'react-router-dom'
import {
    Container,
    Grid,
    TextField,
    Card,
    CardContent,
    CardActions,
    makeStyles,
    Box,
    withStyles, Switch, FormControlLabel,
    Divider
} from "@material-ui/core";
import defaultImage from '../../assets/images/no-image.jpg';
import CustomButton from "../../adapters/CustomButton";
import {CategoryDTO} from "../../adapters/CategoryDTO";
import {blue, grey} from "@material-ui/core/colors";
import {CategoryDAO} from "../../DB/CategoryDAO";
import Message from "../../components/include/Message";

const categoryDAO = new CategoryDAO();
const CATEGORIES_ROUTE = '/panel/categories';

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
        marginTop: '20px'
    }
})

const PrimaryButton = new CustomButton('primary');
const ErrorButton = new CustomButton('error');

const PrimarySwitch = withStyles({
    switchBase: {
        color: grey[400],
        '&$checked': {
            color: blue[600],
        },
        '&$checked + $track': {
            backgroundColor: blue[600],
        },
    },
    checked: {},
    track: {},
})(Switch);

const Category = () => {
    const classes = useStyles();
    const fileRef = useRef();
    const [category, setCategory] = useState(new CategoryDTO());
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const history = useHistory();
    const params = useParams()
    const categoryId = params.id;
    const editMode = !!params.id;

    const getCategory = useCallback(async () => {
        const category = await categoryDAO.getCategory(categoryId)
        setCategory(new CategoryDTO(category))
    }, [categoryId])

    useEffect(() => {
        if (editMode) {
            getCategory()
        }
    }, [params.id, editMode, getCategory])

    const handleUploadThumbnail = () => {
        fileRef.current.click()
    }

    const handleFileChanges = (event) => {
        if (event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0])
            fileReader.onload = () => {
                setCategory(prevState => {
                    return new CategoryDTO({
                        ...prevState,
                        thumbnail: fileReader.result
                    })
                })

            }
        }
    }

    const handleTitleChanges = (event) => {
        const title = event.target.value.trim();
        if (title.length > 0) setCategory(prevState => {
            return new CategoryDTO({
                ...prevState,
                title
            })
        })
    }

    const handleIsPublicChanges = () => {
        setCategory(prevState => {
            return new CategoryDTO({
                ...prevState,
                isPublic: !prevState.isPublic
            })
        })
    }

    const handleCreateCategory = () => {
        categoryDAO.createCategory(category);
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                messages: ['Category created successfully!'],
                status: 'success'
            }
        })

        setTimeout(() => {
            history.push(CATEGORIES_ROUTE)
        }, 4000)
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
                    <Card className={classes.card}>
                        <CardContent>
                            <Box>
                                <img src={category.thumbnail || defaultImage} style={{width: '100%'}} alt="thumbnail"/>
                            </Box>
                            <Box margin="10px 0 0 0">
                                <input type="file" hidden ref={fileRef} onChange={handleFileChanges}/>
                                <PrimaryButton onClick={handleUploadThumbnail}>Upload image</PrimaryButton>
                            </Box>
                            <Box margin="10px 0 0 0">
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={category.title}
                                    onChange={handleTitleChanges}
                                />
                            </Box>
                            <Box margin="10px 0 0 0">
                                <FormControlLabel control={
                                    <PrimarySwitch
                                        checked={category.isPublic}
                                        onChange={handleIsPublicChanges}
                                    />
                                }
                                                  label="is public?"/>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions style={{justifyContent: 'space-between'}}>
                            <PrimaryButton onClick={handleCreateCategory}>Create</PrimaryButton>
                            <ErrorButton onClick={() => history.push(CATEGORIES_ROUTE)}>Cancel</ErrorButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Category;