import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import CustomButton from "../../adapters/CustomButton";
import { ShowChart } from "@material-ui/icons";

const CustomDialog = ({
  show,
  title,
  text,
  doneBtnText,
  cansleBtnText,
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
    >
      {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {cansleBtnText && (
          <ErrorButton onClick={handleClose}>{cansleBtnText}</ErrorButton>
        )}
        {doneBtnText && (
          <PrimaryButton onClick={handleDone}>{doneBtnText}</PrimaryButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
