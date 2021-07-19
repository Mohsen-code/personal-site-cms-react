import { useState } from "react";
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

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  const handleClickPasswordIcon = () => {
    setShowPassword((prevVal) => !prevVal);
  };

  return (
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
            />
          </Box>
          <Box margin="10px 0 0 0">
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              label="password"
              fullWidth
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
        <Button color="primary" variant="contained">
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
  );
};

export default Login;
