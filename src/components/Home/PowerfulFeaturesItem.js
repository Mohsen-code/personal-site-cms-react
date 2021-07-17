import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
});

const PowerfulFeaturesItem = ({ title, subTitle, iconColor, children }) => {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <Card elevation={0}>
        <CardContent>
          {children && (
            <Box color={iconColor} textAlign="center">
              {children}
            </Box>
          )}
          {title && (
            <Typography variant="h6" align="center" className={classes.title}>
              {title}
            </Typography>
          )}
          {subTitle && (
            <Typography
              variant="subtitle2"
              align="center"
              color="textSecondary"
            >
              {subTitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PowerfulFeaturesItem;
