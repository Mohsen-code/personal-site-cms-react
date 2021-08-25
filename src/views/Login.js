import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
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
import {useForm} from "react-hook-form";
import LocalStorage from "../adapters/LocalStorage";
import Message from "../components/include/Message";
import classes from '../styles/login.module.scss'
import {AccountDAO} from "../DB/AccountDAO";
import AppContext from "../store/app-context";
import {AccountDTO} from "../adapters/AccountDTO";
const accountDAO = new AccountDAO();


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const [message, setMessage] = useState({
        show: false,
        messages: [],
        duration: 4000,
        status: "error",
    });

    const ctx = useContext(AppContext)

    const handleSubmitForm = (event) => {
        event.preventDefault();
    };

    const handleClickPasswordIcon = () => {
        setShowPassword((prevVal) => !prevVal);
    };

    const handleLoginBtnClick = async (data) => {
        const user = await accountDAO.getAccountByEmail(data.email);
        let messageProp = "";
        let hasError = false;
        if (user && user.password === data.password) {
            ctx.setAccount(new AccountDTO(user))
            ctx.setIsUserLoggedIn(true);
            const userData = new LocalStorage("app-user-data");
            const expireDate = Math.ceil(new Date().getTime() * 5 * 60 * 60)
            userData.saveUserData({
                id: user.id,
                permission: user.permission,
                userName: user.firstName + " " + user.lastName,
                expireDate: expireDate
            });
            messageProp = "Welcome back babe :D";
            setTimeout(() => {
                history.push('/panel')
            }, message.duration)
        }else{
            messageProp = "Email or password is wrong!";
            hasError = true;
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
            <Card className={classes['login-form']}>
                <CardContent>
                    <Typography variant="h5">Login Form</Typography>
                    <form action="#" onSubmit={handleSubmitForm}>
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
                                label="password"
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
                                                onClick={handleClickPasswordIcon}
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
                        onClick={handleSubmit(handleLoginBtnClick)}
                    >
                        Login
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => history.push("/register")}
                    >
                        Register
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default Login;
