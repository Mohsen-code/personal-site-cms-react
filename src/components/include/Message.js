import { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = ({ messages, status, duration = 4000 }) => {
  const [open, setOpen] = useState(true);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={status}>
        {messages.join("\n")}
      </Alert>
    </Snackbar>
  );
};

export default Message;
