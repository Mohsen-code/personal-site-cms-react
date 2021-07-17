import React from "react";
import { Grid, Divider, Typography, Box, makeStyles } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const useStyle = makeStyles({
  subTitle: {
    color: lightGreen[500],
  },
});

const Section = ({ title, subTitle, description, children }) => {
  const classes = useStyle();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Divider />
        <Box textAlign="center" margin="20px 0 0 0">
          {(title || subTitle) && (
            <Box margin="10px 0">
              {title && (
                <Typography variant="h5" color="textPrimary">
                  {title}
                </Typography>
              )}
              {subTitle && (
                <Typography variant="subtitle2" className={classes.subTitle}>
                  {subTitle}
                </Typography>
              )}
            </Box>
          )}

          {description && (
            <Typography variant="body2" component="p" color="textSecondary">
              {description}
            </Typography>
          )}
        </Box>
      </Grid>

      {children}
    </React.Fragment>
  );
};

export default Section;
