import { useContext } from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Divider,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import ColorPaletteIcon from "@material-ui/icons/Palette";
import EmailIcon from "@material-ui/icons/Email";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import DonutLarge from "@material-ui/icons/DonutLarge";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import CodeIcon from "@material-ui/icons/Code";
import ImageSlider from "../components/include/ImageSlider";
import { lightGreen } from "@material-ui/core/colors";
import AppContext from "../store/app-context";

// styles
import "../styles/style.scss";

// images
import Image1 from "../assets/images/1.jpg";
import Image2 from "../assets/images/2.jpg";
import Image3 from "../assets/images/3.jpg";
import Image4 from "../assets/images/4.jpg";

const sliderItems = [
  { src: Image1, title: "test1", subTitle: "subTitle1" },
  { src: Image2, title: "test2", subTitle: "subTitle2" },
  { src: Image3, title: "test3", subTitle: "subTitle3" },
  { src: Image4, title: "test4", subTitle: "subTitle4" },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    // width: '100vw'
    backgroundColor: "#13151a",
    fontSize: "12px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  media: {
    height: "200px",
  },
  subTitle: {
    color: lightGreen[500],
  },
}));

const Home = () => {
  const ctx = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={ctx.toggleShowDrawer}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
              <Typography variant="subtitle2" className={classes.title}>
                Mohsen App
              </Typography>
              <Box component="div"></Box>
              <IconButton edge="end" color="inherit" aria-label="menu">
                <LanguageIcon fontSize="small" />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="menu">
                <ColorPaletteIcon fontSize="small" />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="menu">
                <EmailIcon fontSize="small" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} style={{ padding: "56px 0 0 0" }}>
          <ImageSlider images={sliderItems} />
        </Grid>
      </Grid>

      <Container>
        <Grid container>
          <Grid item xs={12} style={{ padding: "10px 0 0 0" }}>
            <Divider />
            <Card elevation={0}>
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.title}
                >
                  Powerful Features
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  className={classes.subTitle}
                >
                  To make your mobile page awesome!
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  color="textSecondary"
                >
                  DuoDrawer brings the best in class features for your website.
                  Speed and flexibility and ease of use!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card elevation={0}>
              <CardContent>
                <div style={{
                  textAlign: 'center',
                  color: '#f6bb42'
                }}>
                  <FlashOnIcon fontSize="large"/>
                </div>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                >
                  Lightning Fast
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  color="textSecondary"
                >
                  Designed to be ready when you are. Click and Load.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card elevation={0}>
              <CardContent>
                <div style={{
                  textAlign: 'center',
                  color: '#da4453'
                }}>
                  <DonutLarge fontSize="large"/>
                </div>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                >
                  Best Support
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  color="textSecondary"
                >
                  We treat others like we want to be treated.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card elevation={0}>
              <CardContent>
                <div style={{
                  textAlign: 'center',
                  color: '#4a89dc'
                }}>
                  <SmartphoneIcon fontSize="large"/>
                </div>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                >
                  PWA Ready
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  color="textSecondary"
                >
                  Add it to your home screen and enjoy it as a full PWA.
                </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={6}>
            <Card elevation={0}>
              <CardContent>
                <div style={{
                  textAlign: 'center',
                  color: '#8cc152'
                }}>
                  <CodeIcon fontSize="large"/>
                </div>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                >
                  Material UI Built
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  color="textSecondary"
                >
                  Designed to be easy to edit, with familiar code.
                </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item xs={12}>
            <div style={{ height: "1024px" }}></div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

/* 
<Card elevation={0}>
              <CardMedia className={classes.media} image={Image4} />
              <CardContent>
                <Typography variant="h6" color="textPrimary" component="h1">
                  Post Title
                </Typography>
                <Typography variant="subtitle2" className={classes.subTitle}>
                  Your awesome protfolio subtitle here.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
            </Card>
             */
