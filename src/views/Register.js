import { useState, useReducer, useEffect } from "react";
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

const stateReducer = (state, action) => {
  if (action.type === "FIRST_NAME_CHANGE") {
    return {
      ...state,
      firstNameHasError: action.hasError,
      firstNameErrorMessage: action.errorMessage,
      isFirstNameTouched: action.isTouched,
      firstName: action.value,
    };
  }

  if (action.type === "FIRST_NAME_BLUR") {
    return {
      ...state,
      firstNameHasError: action.hasError,
      firstNameErrorMessage: action.errorMessage,
      isFirstNameTouched: action.isTouched,
    };
  }

  if (action.type === "LAST_NAME_CHANGE") {
    return {
      ...state,
      lastNameHasError: action.hasError,
      lastNameErrorMessage: action.errorMessage,
      isLastNameTouched: action.isTouched,
      lastName: action.value,
    };
  }

  if (action.type === "LAST_NAME_BLUR") {
    return {
      ...state,
      lastNameHasError: action.hasError,
      lastNameErrorMessage: action.errorMessage,
      isLastNameTouched: action.isTouched,
    };
  }

  if (action.type === "EMAIL_CHANGE") {
    return {
      ...state,
      emailHasError: action.hasError,
      emailErrorMessage: action.errorMessage,
      isEmailTouched: action.isTouched,
      email: action.value,
    };
  }

  if (action.type === "EMAIL_BLUR") {
    return {
      ...state,
      emailHasError: action.hasError,
      emailErrorMessage: action.errorMessage,
      isEmailTouched: action.isTouched,
    };
  }

  if (action.type === "PASSWORD_CHANGE") {
    return {
      ...state,
      passwordHasError: action.hasError,
      passwordErrorMessage: action.errorMessage,
      isPasswordTouched: action.isTouched,
      password: action.value,
    };
  }

  if (action.type === "PASSWORD_BLUR") {
    return {
      ...state,
      passwordHasError: action.hasError,
      passwordErrorMessage: action.errorMessage,
      isPasswordTouched: action.isTouched,
    };
  }

  if (action.type === "CONFIRM_PASSWORD_CHANGE") {
    return {
      ...state,
      confrimPasswordHasError: action.hasError,
      confirmPasswordErrorMessage: action.errorMessage,
      isConfirmPasswordTouched: action.isTouched,
      confirmPassword: action.value,
    };
  }

  if (action.type === "CONFIRM_PASSWORD_BLUR") {
    return {
      ...state,
      confrimPasswordHasError: action.hasError,
      confirmPasswordErrorMessage: action.errorMessage,
      isConfirmPasswordTouched: action.isTouched,
    };
  }
};

const Register = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);
  const [state, dispatch] = useReducer(stateReducer, {
    firstName: "",
    isFirstNameValid: false,
    isFirstNameTouched: false,
    firstNameHasError: false,
    firstNameErrorMessage: "",
    lastName: "",
    isLastNameValid: false,
    isLastNameTouched: false,
    lastNameHasError: false,
    lastNameErrorMessage: "",
    email: "",
    isEmailValid: false,
    isEmailTouched: false,
    emailHasError: false,
    emailErrorMessage: "",
    password: "",
    isPasswordValid: false,
    isPasswordTouched: false,
    passwordHasError: false,
    passwordErrorMessage: "",
    confirmPassword: "",
    isConfirmPasswordValid: false,
    isConfirmPasswordTouched: false,
    confrimPasswordHasError: false,
    confirmPasswordErrorMessage: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (state.isConfirmPasswordTouched) {
      const checkConfirmPasswordValidation = setTimeout(() => {
        const hasError = state.password !== state.confirmPassword;
        dispatch({
          type: "CONFIRM_PASSWORD_BLUR",
          errorMessage: hasError
            ? "Confirm password is not the same as password"
            : "",
          hasError: hasError,
          isTouched: true,
        });
      }, 500);

      return () => {
        clearTimeout(checkConfirmPasswordValidation);
      };
    }
  }, [state.password]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleClickPasswordIcon = () => {
    setShowPassword((prevVal) => !prevVal);
  };

  const handleClickConfirmPasswordIcon = () => {
    setShowConfirmPassword((prevVal) => !prevVal);
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    dispatch({
      type: "FIRST_NAME_CHANGE",
      value,
      errorMessage: value.length < 3 ? "Please Eneter Correct Name" : "",
      hasError: value.length < 3,
      isTouched: true,
    });
  };
  const handleFirstNameOnBlur = (event) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      dispatch({
        type: "FIRST_NAME_BLUR",
        errorMessage: "Please Eneter Your First Name",
        hasError: true,
        isTouched: true,
      });
      return;
    }

    dispatch({
      type: "FIRST_NAME_BLUR",
      errorMessage: "",
      hasError: false,
      isTouched: true,
    });
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    dispatch({
      type: "LAST_NAME_CHANGE",
      value,
      errorMessage: value.length < 3 ? "Please Eneter Correct Last Name" : "",
      hasError: value.length < 3,
      isTouched: true,
    });
  };
  const handleLastNameOnBlur = (event) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      dispatch({
        type: "LAST_NAME_BLUR",
        errorMessage: "Please Eneter Your Last Name",
        hasError: true,
        isTouched: true,
      });
      return;
    }

    dispatch({
      type: "LAST_NAME_BLUR",
      errorMessage: "",
      hasError: false,
      isTouched: true,
    });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value.trim();
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = pattern.test(value.toLowerCase());
    dispatch({
      type: "EMAIL_CHANGE",
      errorMessage: !isEmailValid ? "Email is not valid" : "",
      hasError: !isEmailValid,
      isTouched: true,
      value,
    });
  };
  const handleEmailOnBlur = (event) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      dispatch({
        type: "EMAIL_BLUR",
        errorMessage: "Please Eneter Your Email",
        hasError: true,
        isTouched: true,
      });
      return;
    }

    dispatch({
      type: "EMAIL_BLUR",
      errorMessage: "",
      hasError: false,
      isTouched: true,
    });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value.trim();
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const isPasswordValid = pattern.test(value);
    dispatch({
      type: "PASSWORD_CHANGE",
      errorMessage: !isPasswordValid ? "Password is not valid" : "",
      hasError: !isPasswordValid,
      isTouched: true,
      value,
    });
  };
  const handlePasswordOnBlur = (event) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      dispatch({
        type: "PASSWORD_BLUR",
        errorMessage: "Please Eneter Your Password",
        hasError: true,
        isTouched: true,
      });
      return;
    }

    dispatch({
      type: "PASSWORD_BLUR",
      errorMessage: "",
      hasError: false,
      isTouched: true,
    });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value.trim();
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const isPasswordValid = pattern.test(value);
    let errorMessage;
    let hasError = value !== state.password || !isPasswordValid;

    if (!isPasswordValid) errorMessage = "Confirm password is not valid";
    if (value !== state.password)
      errorMessage = "Confirm password is not the same as password";

    dispatch({
      type: "CONFIRM_PASSWORD_CHANGE",
      errorMessage: errorMessage,
      hasError: hasError,
      isTouched: true,
      value,
    });
  };
  const handleConfirmPasswordOnBlur = (event) => {
    const value = event.target.value;
    if (!value || value.trim() === "") {
      dispatch({
        type: "CONFIRM_PASSWORD_BLUR",
        errorMessage: "Please Eneter Confirm Password",
        hasError: true,
        isTouched: true,
      });
      return;
    }

    dispatch({
      type: "CONFIRM_PASSWORD_BLUR",
      errorMessage: "",
      hasError: false,
      isTouched: true,
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Rehister Form</Typography>
        <form action="#" onSubmit={handleSubmitForm}>
          <Box>
            <TextField
              type="text"
              id="firstName"
              label="First Name"
              fullWidth
              autoComplete="off"
              value={state.firstName}
              error={state.firstNameHasError}
              helperText={state.firstNameErrorMessage}
              onBlur={handleFirstNameOnBlur}
              onChange={handleFirstNameChange}
            />
          </Box>
          <Box>
            <TextField
              type="text"
              id="lastName"
              label="Last Name"
              fullWidth
              autoComplete="off"
              error={state.lastNameHasError}
              value={state.lastName}
              helperText={state.lastNameErrorMessage}
              onBlur={handleLastNameOnBlur}
              onChange={handleLastNameChange}
            />
          </Box>
          <Box>
            <TextField
              type="email"
              id="email"
              label="Email"
              fullWidth
              autoComplete="off"
              value={state.email}
              error={state.emailHasError}
              helperText={state.emailErrorMessage}
              onBlur={handleEmailOnBlur}
              onChange={handleEmailChange}
            />
          </Box>
          <Box margin="10px 0 0 0">
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              fullWidth
              value={state.password}
              error={state.passwordHasError}
              helperText={state.passwordErrorMessage}
              onBlur={handlePasswordOnBlur}
              onChange={handlePasswordChange}
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
          <Box margin="10px 0 0 0">
            <TextField
              type={showConfrimPassword ? "text" : "password"}
              id="confirmPassword"
              label="Confirm Password"
              fullWidth
              value={state.confirmPassword}
              error={state.confrimPasswordHasError}
              helperText={state.confirmPasswordErrorMessage}
              onBlur={handleConfirmPasswordOnBlur}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FAIcon
                      icon={showConfrimPassword ? faEye : faEyeSlash}
                      onClick={handleClickConfirmPasswordIcon}
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
        <Button color="primary" variant="contained">
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
  );
};

export default Register;
