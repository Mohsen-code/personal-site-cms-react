import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = ({ show, onClose, messages, status, duration }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={show}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={status}>
        {messages.join("\n")}
      </Alert>
    </Snackbar>
  );
};

export default Message;
