import React, {useState, useRef, useContext} from "react";
import {useHistory} from "react-router";
import {
    TextField,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    Box,
    Typography,
    InputAdornment,
} from "@material-ui/core";

import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import FAIcon from "../components/include/FontAwesomeIcon";
import LocalStorage from "../adapters/LocalStorage";
import Message from "../components/include/Message";
import {useForm} from "react-hook-form";
import classes from '../styles/register.module.scss'
import {AccountDAO} from "../DB/AccountDAO";
import {AccountDTO} from "../adapters/AccountDTO";
import AppContext from "../store/app-context";

const accountDAO = new AccountDAO();

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const history = useHistory();
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });
    const ctx = useContext(AppContext)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm();

    const passwordRef = useRef();
    passwordRef.current = watch("password", "");

    const handleRegisterBtnClick = async (data) => {
        let messageProp = "";
        let hasError = false;

        const user = await accountDAO.getAccountByEmail(data.email)

        if (user) {
            hasError = true;
            messageProp = "This user exist!";
        } else {
            const account = new AccountDTO(data);
            const userData = new LocalStorage("app-user-data");
            account.permission = "user"
            accountDAO.createAccount(account)
            const expireDate = Math.ceil(new Date().getTime() + (5 * 60 * 60 * 1000))
            userData.saveUserData({
                id: account.id,
                permission: account.permission,
                userName: account.firstName + " " + account.lastName,
                expireDate: expireDate
            });
            messageProp = "You have bee registered successfully!";
            reset();
            ctx.setIsUserLoggedIn(true);
            ctx.setAccount(account)
            setTimeout(() => {
                history.push('/panel')
            }, message.duration)
        }

        setMessage((prevData) => {
            return {
                ...prevData,
                show: true,
                status: hasError ? "error" : "success",
                messages: [messageProp],
            };
        });
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
            <Card className={classes['register-form']}>
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
                                type={showConfirmPassword ? "text" : "password"}
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
                                                icon={showConfirmPassword ? faEye : faEyeSlash}
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
