import avatarImage from "../../assets/images/4.jpg";
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";
import { faUser, faEnvelope, faInbox, faComments, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import FAIcon from "../../components/include/FontAwesomeIcon";
import TodoList from "../../components/Panel/Dashboard/TodoList";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#292c31",
  },
});

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container>
      <Box padding="20px 0 0 0">
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <img src={avatarImage} style={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box padding="0 0 0 0">
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <FAIcon icon={faUser} fontSize="lg" />
                          </ListItemIcon>
                          <ListItemText>Name: Mohsen Fallahnejad</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <FAIcon icon={faEnvelope} fontSize="lg" />
                          </ListItemIcon>
                          <ListItemText>Email: Mohsen Fallahnejad</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <FAIcon icon={faInbox} fontSize="lg" />
                          </ListItemIcon>
                          <ListItemText>Posts Number: 23</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <FAIcon icon={faComments} fontSize="lg" />
                          </ListItemIcon>
                          <ListItemText>Comments Number: 23</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <FAIcon icon={faMailBulk} fontSize="lg" />
                          </ListItemIcon>
                          <ListItemText>Messages Number: 23</ListItemText>
                        </ListItem>
                        <Divider />
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} style={{margin: '20px 0'}}>
              <TodoList/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
