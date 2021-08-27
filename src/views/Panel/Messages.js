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
    makeStyles, Switch, FormControlLabel, TextField, Typography
} from "@material-ui/core";
import FAIcon from "../../components/include/FontAwesomeIcon";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Alert} from "@material-ui/lab";
import React, {useCallback, useEffect, useState} from "react";
import CustomIconButton from "../../adapters/CustomIconButton";
import {MessageDAO} from "../../DB/MessageDAO";
import Dialog from "../../components/include/Dialog";
import {MessageDTO} from "../../adapters/MessageDTO";
import Message from "../../components/include/Message";

const messageDAO = new MessageDAO();

const useStyles = makeStyles({
    card: {
        backgroundColor: "#292c31",
    }
});


const PrimaryIconButton = new CustomIconButton('primary')
const ErrorIconButton = new CustomIconButton('error')

export const Messages = () => {
    const classes = useStyles()
    const [isSeen, setIsSeen] = useState(false);
    const [messages, setMessages] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [currentMessage, setCurrentMessage] = useState(new MessageDTO())
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });

    const getMessagesByStatus = useCallback(async (isSeen = false) => {
        setMessages(await messageDAO.getMessagesByStatus(isSeen))
    }, [])

    useEffect(() => {
        getMessagesByStatus()
    }, [getMessagesByStatus])

    const handleIsSeenChanges = () => {
        getMessagesByStatus(!isSeen)
        setIsSeen(prevState => !prevState)
    }

    const handleClickOnOpenMessage = (message) => {
        setCurrentMessage(message)
        const updatedMessage = {...message, isSeen: true}
        messageDAO.updateMessage(updatedMessage)
        setShowDialog(true)
    }

    const handleClickOnDeleteMessage = (messageId) => {
        messageDAO.deleteMessage(messageId)
        setMessages(prevState => {
            const filteredMessages = prevState.filter(message => message.id !== messageId)
            return [...filteredMessages]
        })
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Message deleted successfully!']
            }
        })
    }

    return(
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
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box margin="10px 0">
                            <Typography variant="h6">Name:</Typography>
                            <Typography variant="h5">{currentMessage.name}</Typography>
                        </Box>
                        <Box margin="10px 0">
                            <Typography variant="h6">Email:</Typography>
                            <Typography variant="h5">{currentMessage.email}</Typography>
                        </Box>
                        <Box margin="10px 0">
                            <Typography variant="h6">Title:</Typography>
                            <Typography variant="h5">{currentMessage.title}</Typography>
                        </Box>
                        <Box margin="10px 0">
                            <Typography variant="h6">Content:</Typography>
                            <Typography variant="body1">{currentMessage.content}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
            <Grid container>
                <Grid item xs={12} style={{display: 'flex', alignItems: 'center'}}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isSeen}
                                onChange={handleIsSeenChanges}
                                name="isSeen"
                                color="primary"
                            />
                        }
                        label="Is Seen?"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>name</TableCell>
                                            <TableCell>email</TableCell>
                                            <TableCell>title</TableCell>
                                            <TableCell>Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {messages.length > 0 && <TableBody>
                                        {messages.map(message => {
                                            return (
                                                <TableRow key={message.id}>
                                                    <TableCell>{message.name}</TableCell>
                                                    <TableCell>{message.email}</TableCell>
                                                    <TableCell>{message.title}</TableCell>
                                                    <TableCell>
                                                        <PrimaryIconButton
                                                            onClick={() => handleClickOnOpenMessage(message)}>
                                                            <FAIcon icon={faEye} fontSize="sm"/>
                                                        </PrimaryIconButton>
                                                        <ErrorIconButton
                                                            onClick={() => handleClickOnDeleteMessage(message.id)}>
                                                            <FAIcon icon={faTrash} fontSize="sm"/>
                                                        </ErrorIconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>}
                                    {messages.length > 0 && <TableFooter>
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
                            {messages.length === 0 && <Alert variant="filled" severity="error">There is no message!</Alert>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}