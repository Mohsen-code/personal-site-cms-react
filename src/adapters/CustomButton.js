import { Button, withStyles } from "@material-ui/core";
import { blue, green, amber, red } from "@material-ui/core/colors";

export default class CustomButton {
  colors = {
    primary: blue[700],
    success: green[700],
    warning: amber[700],
    error: red[700],
  };
  hoverBgColors = {
    primary: blue[800],
    success: green[800],
    warning: amber[800],
    error: red[800],
  };

  constructor(type) {
    return withStyles((theme) => ({
      root: {
        color: theme.palette.getContrastText(
          this.colors[type] || this.colors.primary
        ),
        backgroundColor: this.colors[type] || this.colors.primary,
        "&:hover": {
          backgroundColor:
            this.hoverBgColors[type] || this.hoverBgColors.primary,
        },
      },
    }))(Button);
  }
}
