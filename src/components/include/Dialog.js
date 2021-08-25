import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import CustomButton from "../../adapters/CustomButton";

const CustomDialog = ({
  show,
  title,
  text,
  doneBtnText,
  cancelBtnText,
  handleClose,
  handleDone,
  children,
}) => {
  const PrimaryButton = new CustomButton("primary");
  const ErrorButton = new CustomButton("error");

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {cancelBtnText && (
          <ErrorButton onClick={handleClose}>{cancelBtnText}</ErrorButton>
        )}
        {doneBtnText && (
          <PrimaryButton onClick={handleDone}>{doneBtnText}</PrimaryButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
