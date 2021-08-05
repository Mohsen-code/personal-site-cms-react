import React, {useState} from "react";
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
import {blue, green, amber, red, grey} from "@material-ui/core/colors";

import Dialog from "../../include/Dialog";
import CustomButton from "../../../adapters/CustomButton";
import CustomIconButton from "../../../adapters/CustomIconButton";
import CustomCheckbox from "../../../adapters/CustomCheckbox";
import TodoListAdapter from "../../../adapters/TodoList";

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

const TodoList = () => {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState("");
    const [todoTitleDefaultValue, setTodoTitleDefaultValue] = useState("");
    const [todoDescriptionDefaultValue, setTodoDescriptionDefaultValue] = useState("");
    const [todoIsDoneDefaultValue, setTodoIsDoneDefaultValue] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const PrimaryButton = new CustomButton("primary");
    const WarningIconButton = new CustomIconButton("warning");
    const PrimaryCheckbox = new CustomCheckbox("primary");

    const handleFormSubmission = (data) => {
        console.log('data => ', data)
        if (!editMode) {
            handleNewTodo(data);
            return;
        }

        handleUpdateTodo(data)
    }
    const handleNewTodo = (data) => {
        const {title, description} = data;
        todos.newTodo(title, description);
        setShowDialog(false);
        reset()
    }

    const handleUpdateTodo = (data) => {
        const updatedData = {...data, id: currentTodoId, isDone: todoIsDoneDefaultValue}
        todos.updateTodo(updatedData)
        setShowDialog(false);
        reset()
    }

    const handleAddNewTodoClickBtn = () => {
        setEditMode(false)
        setCurrentTodoId("")
        setTodoTitleDefaultValue("")
        setTodoDescriptionDefaultValue("")
        setTodoIsDoneDefaultValue(false)
        setShowDialog(true)
    }

    const handleClickOnEditTodo = (todoItem) => {
        setEditMode(true)
        setCurrentTodoId(todoItem.id)
        setTodoTitleDefaultValue(todoItem.title)
        setTodoDescriptionDefaultValue(todoItem.description)
        setTodoIsDoneDefaultValue(todoItem.isDone)
        setShowDialog(true)
    }

    const todos = new TodoListAdapter();
    const todosItems = todos.getTodos("unFinished");

    const jsxTodosItems = todosItems.map(todoItem => {
        return (
            <React.Fragment key={todoItem.id}>
                <ListItem button>
                    <ListItemIcon>
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
    })

    const [showDialog, setShowDialog] = useState(false);

    return (
        <React.Fragment>
            {
                <Dialog
                    cansleBtnText="close"
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
                                    defaultValue={todoTitleDefaultValue}
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Please enter your email",
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
                                    defaultValue={todoDescriptionDefaultValue}
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
                                        checked={todoIsDoneDefaultValue}
                                        onChange={() => setTodoIsDoneDefaultValue(prevData => !prevData)}
                                    />
                                }
                                                  label="is finished?"/>
                            </Box>
                        </Grid>
                    </Grid>
                </Dialog>
            }
            <Card className={classes.root}>
                <CardActions className={classes.cardAction}>
                    <Typography variant="h5">Todo List</Typography>
                    <PrimaryButton onClick={handleAddNewTodoClickBtn}>
                        Add Item
                    </PrimaryButton>
                </CardActions>
                {jsxTodosItems.length === 0 && <Box padding="10px">
                    <Typography variant="h6" color="error">There is no todo for show!</Typography>
                </Box>}
                {jsxTodosItems.length > 0 && <CardContent>
                    <List>
                        {jsxTodosItems}
                    </List>
                </CardContent>}
            </Card>
        </React.Fragment>
    );
};

export default TodoList;
