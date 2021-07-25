import { withStyles, Checkbox } from "@material-ui/core";
import { blue, green, amber, red } from "@material-ui/core/colors";

export default class CustomCheckbox {
  colors = {
    primary: blue[400],
    success: green[400],
    warning: amber[400],
    error: red[400],
  };
  checkedColors = {
    primary: blue[600],
    success: green[600],
    warning: amber[600],
    error: red[600],
  };
  constructor(type) {
    return withStyles({
      root: {
        color: this.colors.[type],
        "&$checked": {
          color: this.checkedColors.[type],
        },
      },
      checked: {},
    })((props) => <Checkbox color="default" {...props} />);
  }
}
