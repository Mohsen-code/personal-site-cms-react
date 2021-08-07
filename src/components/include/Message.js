import { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = ({ show, onClose, messages, status, duration = 4000 }) => {
  const [open, setOpen] = useState(true);
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
      <Alert onClose={() => setOpen(false)} severity={status}>
        {messages.join("\n")}
      </Alert>
    </Snackbar>
  );
};

export default Message;
