import React, { useState } from "react";
import { useHistory } from "react-router";
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

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import FAIcon from "../components/include/FontAwesomeIcon";
import { useForm } from "react-hook-form";
import LocalStorage from "../adapters/LocalStorage";
import Message from "../components/include/Message";

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

const ls = new LocalStorage("app-users");

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState({
    show: false,
    messages: [],
    duration: 4000,
    status: "error",
  });

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleClickPasswordIcon = () => {
    setShowPassword((prevVal) => !prevVal);
  };

  const handleLoginBtnClick = (data) => {
    const user = ls.getUserByEmail(data.email);
    let messagesss = "Email or password is wrong!";
    let hasError = true;
    if (user && user.password === data.password) {
      const userData = new LocalStorage("app-user-data");
      userData.saveUserData({
        id: user.id,
        permission: user.permision,
        userName: user.firstName + " " + user.lastName,
      });

      messagesss = "Welcome back babe :D";
      hasError = false;
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

    console.log("user is not valid!");
  };

  return (
    <React.Fragment>
      {message.show && (
        <Message
          messages={message.messages}
          duration={message.duration}
          status={message.status}
        />
      )}
      <Card className={classes.root}>
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
        <Divider />
        <CardActions style={{ justifyContent: "space-between" }}>
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
