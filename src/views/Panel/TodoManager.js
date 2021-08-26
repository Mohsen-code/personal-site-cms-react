import React, {useCallback, useEffect, useState} from "react";
import {
    Container,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    Box,
    Card,
    CardContent,
    makeStyles, Avatar, Switch, FormControlLabel, TextField
} from "@material-ui/core";
import Message from "../../components/include/Message";
import CustomButton from "../../adapters/CustomButton";
import FAIcon from "../../components/include/FontAwesomeIcon";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "@material-ui/lab";
import CustomIconButton from "../../adapters/CustomIconButton";
import {TodoDAO} from "../../DB/TodoDAO";
import {TodoDTO} from "../../adapters/TodoDTO";
import Dialog from "../../components/include/Dialog";
import {useForm} from "react-hook-form";

const todoDAO = new TodoDAO();

const PrimaryButton = new CustomButton('primary')
const WarningIconButton = new CustomIconButton('warning')
const ErrorIconButton = new CustomIconButton('error')

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
    }
});

export const TodoManager = () => {
    const classes = useStyles()
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState(new TodoDTO())
    const [editMode, setEditMode] = useState(false)
    const [isDone, setIsDone] = useState(true)
    const [showDialog, setShowDialog] = useState(false);
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

    const getTodosByIsDoneStatus = useCallback(async (status) => {
        const todosList = await todoDAO.getTodosByIsDone(status)
        const mappedTodos = todosList.map(todo => new TodoDTO(todo));
        setTodos(mappedTodos);
    }, [])

    useEffect(() => {
        getTodosByIsDoneStatus(true)
    }, [getTodosByIsDoneStatus])

    const handleIsDoneChanges = () => {
        if (isDone) {
            setIsDone(false)
            getTodosByIsDoneStatus(false)
            return
        }
        setIsDone(true)
        getTodosByIsDoneStatus(true)
    }

    const handleClickOnAddTodo = () => {
        setTodo(new TodoDTO());
        setShowDialog(true)
    }

    const handleClickOnEditTodo = (todo) => {
        setEditMode(true)
        setTodo(todo)
        setShowDialog(true)
    }

    const handleClickOnDeleteTodo = (todoId) => {
        todoDAO.deleteTodo(todoId)
        setTodos(prevState => {
            const filteredTodosList = prevState.filter(todo => todo.id !== todoId)
            return [...filteredTodosList]
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['todo deleted successfully!']
            }
        })
    }

    const handleFormSubmission = (data) => {
        if (!editMode) {
            newTodo(data)
            return;
        }
        updateTodo(data)
    }

    const newTodo = ({title, description}) => {
        const newTodoObj = {...todo, title, description}
        setTodo(newTodoObj)
        todoDAO.createTodo(newTodoObj)
        setTodos(prevState => {
            return [...prevState, newTodoObj]
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['todo added successfully!']
            }
        })
        setShowDialog(false);
    }

    const updateTodo = ({title, description}) => {
        const updatedTodo = {...todo, title, description}
        setTodo(updatedTodo)
        todoDAO.updateTodo(updatedTodo)
        setTodos(prevState => {
            const todoIndex = prevState.findIndex(todo => todo.id === updatedTodo.id)
            prevState[todoIndex] = updatedTodo;
            return [...prevState]
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['todo updated successfully!']
            }
        })
        setShowDialog(false);
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
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={todo.isDone}
                                        onChange={() => setTodo(prevState => {
                                            return {...prevState, isDone: !prevState.isDone}
                                        })}
                                        name="isDone"
                                        color="primary"
                                    />
                                }
                                label="is done?"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box margin="15px 0 0 0">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={todo.isImportant}
                                        onChange={() => setTodo(prevState => {
                                            return {...prevState, isImportant: !prevState.isImportant}
                                        })}
                                        name="isDone"
                                        color="primary"
                                    />
                                }
                                label="is important?"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>

            <Grid container>
                <Grid item xs={6} style={{display: 'flex', alignItems: 'center'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDone}
                                onChange={handleIsDoneChanges}
                                name="isDone"
                                color="primary"
                            />
                        }
                        label="Is Done Todos"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box margin="20px 0" textAlign={'right'}>
                        <PrimaryButton onClick={handleClickOnAddTodo}>Add Todo</PrimaryButton>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Important</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {todos.length > 0 && <TableBody>
                                        {todos.map(todo => {
                                            return (
                                                <TableRow key={todo.id}>
                                                    <TableCell>{todo.title}</TableCell>
                                                    <TableCell>{todo.description}</TableCell>
                                                    <TableCell>{todo.isImportant}</TableCell>
                                                    <TableCell>
                                                        <WarningIconButton onClick={() => handleClickOnEditTodo(todo)}>
                                                            <FAIcon icon={faEdit} fontSize="sm"/>
                                                        </WarningIconButton>
                                                        <ErrorIconButton
                                                            onClick={() => handleClickOnDeleteTodo(todo.id)}>
                                                            <FAIcon icon={faTrash} fontSize="sm"/>
                                                        </ErrorIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}
                                    {todos.length > 0 && <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                count={10}
                                                onPageChange={() => {
                                                }}
                                                page={1}
                                                rowsPerPage={5}
                                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                            />
                                        </TableRow>
                                    </TableFooter>}
                                </Table>
                            </TableContainer>
                            {todos.length === 0 && <Alert variant="filled" severity="error">There is no todo!</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}