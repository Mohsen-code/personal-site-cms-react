import {Container, Grid, TextField, Card, CardContent, CardActions, makeStyles, Box, Divider} from "@material-ui/core";
import CustomButton from "../adapters/CustomButton";
import React, {useState} from "react";
import {MessageDTO} from "../adapters/MessageDTO";
import {useForm} from "react-hook-form";
import {MessageDAO} from "../DB/MessageDAO";
import Message from "../components/include/Message";

const messageDAO = new MessageDAO();

const useStyle = makeStyles({
    card: {
        backgroundColor: "#292c31",
        marginTop: '20px'
    }
})

const PrimaryButton = new CustomButton('primary')

export const ContactUs = () => {
    const classes = useStyle()
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
        formState: {errors}
    } = useForm()

    const handleSendMessage = (data) => {
        const messageObj = new MessageDTO(data)
        messageDAO.createMessage(messageObj);
        setMessage(prevState => {
            return {
                ...prevState,
                show: true,
                status: 'success',
                messages: ['Message sent successfully!']
            }
        })
        reset()
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
                        <form onSubmit={handleSubmit(handleSendMessage)}>
                            <CardContent>
                                <Box>
                                    <TextField
                                        label={`Name`}
                                        fullWidth
                                        defaultValue=""
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Please enter your name",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Name must be at least 3 characters"
                                            }
                                        })}
                                        error={!!errors.name}
                                        helperText={(errors.name && errors.name.message) || ""}
                                    />
                                </Box>
                                <Box margin={'10px 0'}>
                                    <TextField
                                    label={`Email`}
                                    fullWidth
                                    defaultValue=""
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Please enter your email",
                                        },
                                        pattern: {
                                            value:
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "email is not valid",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={(errors.email && errors.email.message) || ""}
                                />
                                </Box>
                                <Box margin={'10px 0'}>
                                    <TextField
                                        label={`Title`}
                                        fullWidth
                                        defaultValue=""
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
                                        error={!!errors.title}
                                        helperText={(errors.title && errors.title.message) || ""}
                                    />
                                </Box>
                                <Box margin={'10px 0'}>
                                    <TextField
                                        label={`Message`}
                                        multiline
                                        rows={10}
                                        fullWidth
                                        defaultValue=""
                                        {...register("content", {
                                            required: {
                                                value: true,
                                                message: "Please enter message",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Message must be at least 3 characters"
                                            }
                                        })}
                                        error={!!errors.content}
                                        helperText={(errors.content && errors.content.message) || ""}
                                    />
                                </Box>
                            </CardContent>
                            <CardActions>
                                <PrimaryButton type="submit">Send Message</PrimaryButton>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}