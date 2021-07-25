import { IconButton, withStyles } from "@material-ui/core";
import { blue, green, amber, red } from "@material-ui/core/colors";

export default class CustomIconButton {
  colors = {
    primary: blue[700],
    success: green[700],
    warning: amber[700],
    error: red[700],
  };

  constructor(type) {
    return withStyles(() => ({
      root: {
        color: this.colors[type],
      },
    }))(IconButton);
  }
}
