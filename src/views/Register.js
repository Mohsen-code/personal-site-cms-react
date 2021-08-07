import React, {useState, useRef} from "react";
import {useHistory} from "react-router";
import {
    TextField,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    makeStyles,
    Box,
    Typography,
    InputAdornment,
} from "@material-ui/core";

import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import FAIcon from "../components/include/FontAwesomeIcon";
import LocalStorage from "../adapters/LocalStorage";
import Message from "../components/include/Message";
import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#292c31",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
    },
});

const Register = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setShowConfirmPassword] = useState(false);
    const history = useHistory();
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    const passwordRef = useRef();
    passwordRef.current = watch("password", "");

    const handleRegisterBtnClick = (data) => {
        const ls = new LocalStorage("app-users");
        let messagesss = "This user exist!";
        let hasError = true;

        if (!ls.emailExist(data.email)) {
            const userData = new LocalStorage("app-user-data");
            data.id = uuidv4().replace(/-/g, "");
            data.permision = "user";
            ls.addItem(data);

            userData.saveUserData({
                id: data.id,
                permission: data.permision,
                userName: data.firstName + " " + data.lastName,
            });

            messagesss = "You have bee registered successfully!";
            hasError = false;
            reset();
        }

        setMessage((prevData) => {
            return {
                ...prevData,
                show: true,
                status: hasError ? "error" : "success",
                messages: [messagesss],
            };
        });

        setTimeout(() => {
            setMessage((prevData) => {
                return {
                    ...prevData,
                    show: false,
                    status: "error",
                    messages: [],
                };
            });
        }, message.duration + 100);

        console.log("we are here", messagesss);
    };

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
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5">Rehister Form</Typography>
                    <form action="#">
                        <Box>
                            <TextField
                                type="text"
                                id="firstName"
                                label="First Name"
                                fullWidth
                                autoComplete="off"
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: "Please enter your first name",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "First name must be at least 3 character",
                                    },
                                })}
                                error={errors.firstName ? true : false}
                                helperText={
                                    (errors.firstName && errors.firstName.message) || ""
                                }
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="text"
                                id="lastName"
                                label="Last Name"
                                fullWidth
                                autoComplete="off"
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: "Please enter your last name",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Last name must be at least 3 character",
                                    },
                                })}
                                error={errors.lastName ? true : false}
                                helperText={(errors.lastName && errors.lastName.message) || ""}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="email"
                                id="email"
                                label="Email"
                                fullWidth
                                autoComplete="off"
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
                                error={errors.email ? true : false}
                                helperText={(errors.email && errors.email.message) || ""}
                            />
                        </Box>
                        <Box margin="10px 0 0 0">
                            <TextField
                                type={showPassword ? "text" : "password"}
                                id="password"
                                label="Password"
                                fullWidth
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Please enter your password",
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                        message: "password is not valid",
                                    },
                                })}
                                error={errors.password ? true : false}
                                helperText={(errors.password && errors.password.message) || ""}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FAIcon
                                                icon={showPassword ? faEye : faEyeSlash}
                                                onClick={() => setShowPassword((prevData) => !prevData)}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box margin="10px 0 0 0">
                            <TextField
                                type={showConfrimPassword ? "text" : "password"}
                                id="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Please enter your password",
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                        message: "confirm password is not valid",
                                    },
                                    validate: (value) =>
                                        value === passwordRef.current ||
                                        "confirm password is not the same as password",
                                })}
                                error={errors.confirmPassword ? true : false}
                                helperText={
                                    (errors.confirmPassword && errors.confirmPassword.message) ||
                                    ""
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FAIcon
                                                icon={showConfrimPassword ? faEye : faEyeSlash}
                                                onClick={() =>
                                                    setShowConfirmPassword((prevData) => !prevData)
                                                }
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </form>
                </CardContent>
                <Divider/>
                <CardActions style={{justifyContent: "space-between"}}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit(handleRegisterBtnClick)}
                    >
                        Register
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => history.push("/login")}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default Register;
