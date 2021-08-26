import React, {useCallback, useEffect, useState} from "react";
import {
    Grid,
    Box,
    Card,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Typography,
    TextField,
    makeStyles,
    FormControlLabel,
    Switch,
    withStyles
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import FAIcon from "../../include/FontAwesomeIcon";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {blue, grey} from "@material-ui/core/colors";

import Dialog from "../../include/Dialog";
import CustomButton from "../../../adapters/CustomButton";
import CustomIconButton from "../../../adapters/CustomIconButton";
import CustomCheckbox from "../../../adapters/CustomCheckbox";
import {TodoDTO} from "../../../adapters/TodoDTO";
import {TodoDAO} from "../../../DB/TodoDAO";
import Message from "../../include/Message";

const todoDAO = new TodoDAO();

const useStyles = makeStyles({
    root: {
        backgroundColor: "#292c31",
    },
    cardAction: {
        justifyContent: "space-between",
    },
    listItem: {
        display: "flex",
        alignItems: "center",
    },
});


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

const PrimaryButton = new CustomButton("primary");
const WarningIconButton = new CustomIconButton("warning");
const PrimaryCheckbox = new CustomCheckbox("primary");

/*
* TODO: Working on create todo!
* */


const TodoList = () => {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState(new TodoDTO())
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();


    const getTodosByIsDone = useCallback(async (todoMode) => {
        const todosList = await todoDAO.getTodosByIsDone(todoMode)
        console.log('todosList => ', todosList)
        setTodos(todosList.map(todo => new TodoDTO(todo)))
    }, [])

    useEffect(() => {
        getTodosByIsDone(false);
    }, [getTodosByIsDone])

    const handleFormSubmission = (data) => {
        if (!editMode) {
            handleNewTodo(data);
            return;
        }

        handleUpdateTodo(data)
    }
    const handleNewTodo = (data) => {
        const {title, description} = data;
        const newTodo = {
            ...todo,
            title,
            description
        }
        setTodo(newTodo);
        todoDAO.createTodo(newTodo)
        setTodos(prevState => {
            return [...prevState, newTodo]
        })

        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['todo added successfully']
            }
        })
        setShowDialog(false);
        setTodo(prevState => new TodoDTO())
        reset()
    }

    const handleUpdateTodo = (data) => {
        const updatedTodo = {
            ...todo,
            title: data.title ? data.title : todo.title,
            description: data.description ? data.description : todo.description
        }
        todoDAO.updateTodo(updatedTodo)
        setTodos(prevState => {
            if (!updatedTodo.isDone) {
                const todoIndex = prevState.findIndex(todo => todo.id === updatedTodo.id);
                prevState[todoIndex] = updatedTodo;
                return [...prevState]
            }

            const filteredTodos = prevState.filter(todo => todo.id !== updatedTodo.id)
            return [...filteredTodos]
        })
        setShowDialog(false);
        reset()
    }

    const handleAddNewTodoClickBtn = () => {
        setEditMode(false)
        setTodo(new TodoDTO())
        setShowDialog(true)
    }

    const handleClickOnEditTodo = (todoItem) => {
        setEditMode(true)
        setTodo(todoItem)
        setShowDialog(true)
    }

    const handleClickOnTodoCheckBox = (todo) => {
        const updatedTodo = new TodoDTO({...todo, isDone: true})
        todoDAO.updateTodo(updatedTodo)
        setTodos(prevState => {
            const filteredTodos = prevState.filter(todo => todo.id !== updatedTodo.id)
            return [...filteredTodos]
        })
    }

    const [showDialog, setShowDialog] = useState(false);

    return (
        <React.Fragment>
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
            <Dialog
                cancelBtnText="close"
                show={showDialog}
                handleClose={() => setShowDialog(false)}
                doneBtnText={editMode ? "update" : "add"}
                handleDone={handleSubmit(handleFormSubmission)}
                title="Add Todo"
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box margin="0 0 10px 0">
                            <TextField
                                label="Title"
                                type="text"
                                fullWidth
                                defaultValue={todo.title}
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Please enter title",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Title must be at least 3 characters"
                                    }
                                })}
                                error={errors.title ? true : false}
                                helperText={(errors.title && errors.title.message) || ""}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <TextField
                                label="Description"
                                type="text"
                                rows={4}
                                multiline
                                fullWidth
                                defaultValue={todo.description}
                                {...register("description", {
                                    required: false
                                })}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box margin="15px 0 0 0">
                            <FormControlLabel control={
                                <PrimarySwitch
                                    checked={todo.isDone}
                                    onChange={() => setTodo(prevState => {
                                        return {...prevState, isDone: !prevState.isDone}
                                    })}
                                />
                            }
                                              label="is done?"/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box margin="15px 0 0 0">
                            <FormControlLabel control={
                                <PrimarySwitch
                                    checked={todo.isImportant}
                                    onChange={() => setTodo(prevState => {
                                        return {...prevState, isImportant: !prevState.isImportant}
                                    })}
                                />
                            }
                                              label="is important?"/>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
            <Card className={classes.root}>
                <CardActions className={classes.cardAction}>
                    <Typography variant="h5">Todo List</Typography>
                    <PrimaryButton onClick={handleAddNewTodoClickBtn}>
                        Add Item
                    </PrimaryButton>
                </CardActions>
                {todos.length === 0 && <Box padding="10px">
                    <Typography variant="h6" color="error">There is no todo for show!</Typography>
                </Box>}
                {todos.length > 0 && <CardContent>
                    <List>
                        {todos.map(todoItem => {
                            return (
                                <React.Fragment key={todoItem.id}>
                                    <ListItem button>
                                        <ListItemIcon onClick={() => handleClickOnTodoCheckBox(todoItem)}>
                                            <PrimaryCheckbox edge="start"/>
                                        </ListItemIcon>
                                        <ListItemText>{todoItem.title}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <WarningIconButton onClick={() => handleClickOnEditTodo(todoItem)}>
                                                <FAIcon icon={faEdit} fontSize="sm"/>
                                            </WarningIconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider/>
                                </React.Fragment>
                            )
                        })}
                    </List>
                </CardContent>}
            </Card>
        </React.Fragment>
    );
};

export default TodoList;
