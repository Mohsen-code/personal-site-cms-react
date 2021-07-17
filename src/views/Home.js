import { useContext } from "react";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  Button,
  Fab,
  withStyles,
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
import ImageGallery from "../components/include/ImageGallery";
import AppContext from "../store/app-context";
import Section from "../components/Home/Section";
import PowerfulFeaturesItem from "../components/Home/PowerfulFeaturesItem";
import FAIcon from "../components/include/FontAwesomeIcon";

import { faPhone,faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { pink, lightGreen, grey } from "@material-ui/core/colors";

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

const imageGalleryItems = [
  { src: Image1, thumbnail: Image1 },
  { src: Image2, thumbnail: Image2 },
  { src: Image3, thumbnail: Image3 },
  { src: Image4, thumbnail: Image4 },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    // width: '100vw'
    backgroundColor: "#13151a",
    fontSize: "12px",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const InstagramButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(pink[400]),
    backgroundColor: pink[400],
    "&:hover": {
      backgroundColor: pink[700],
    },
  },
}))(Fab);

const PhoneButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen[400]),
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[700],
    },
  },
}))(Fab);

const UpArrowButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[400],
    "&:hover": {
      backgroundColor: grey[700],
    },
  },
}))(Fab);

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
        <Grid item xs={12}>
          <Box padding="56px 0 0 0">
            <ImageSlider images={sliderItems} />
          </Box>
        </Grid>
      </Grid>

      <Container>
        <Grid container>
          <Section
            title="Powerful Features"
            subTitle="To make your mobile page awesome!"
            description="DuoDrawer brings the best in class features for your website.
                  Speed and flexibility and ease of use!"
          >
            <PowerfulFeaturesItem
              title="Lightning Fast"
              subTitle="Designed to be ready when you are. Click and Load."
              iconColor="#f6bb42"
            >
              <FlashOnIcon fontSize="large" />
            </PowerfulFeaturesItem>

            <PowerfulFeaturesItem
              title="Best Support"
              subTitle="We treat others like we want to be treated."
              iconColor="#da4453"
            >
              <DonutLarge fontSize="large" />
            </PowerfulFeaturesItem>

            <PowerfulFeaturesItem
              title="PWA Ready"
              subTitle="Add it to your home screen and enjoy it as a full PWA."
              iconColor="#4a89dc"
            >
              <SmartphoneIcon fontSize="large" />
            </PowerfulFeaturesItem>

            <PowerfulFeaturesItem
              title="Material UI Built"
              subTitle="Designed to be easy to edit, with familiar code."
              iconColor="#8cc152"
            >
              <CodeIcon fontSize="large" />
            </PowerfulFeaturesItem>
          </Section>

          <Section
            title="Featured Projects"
            subTitle="Our latest and Greatest Works!"
            description="Products we are proud to showcase and show off to the world. We
            think you'll love them!"
          >
            <Box>
              <ImageGallery images={imageGalleryItems} />
            </Box>
          </Section>

          <Section
            title="Mohsen Fallahnejad"
            subTitle="The Best Web Developer"
            description="I have at least 5 years experience in web development with Javascript, Typescript, VueJS, ReactJS, Bootstrap and many libraries"
            styles={{ padding: "0 0 10px 0" }}
          >
            <Box 
            display="flex" 
            justifyContent="space-evenly"
            width="200px"
            margin="20px auto"
            >
              <InstagramButton size="small">
                <FAIcon icon={faInstagram} fontSize="lg"/>
              </InstagramButton>

              <PhoneButton size="small">
                <FAIcon icon={faPhone} fontSize="lg"/>
              </PhoneButton>

              <UpArrowButton size="small">
                <FAIcon icon={faAngleUp} fontSize="lg"/>
              </UpArrowButton>
            </Box>
          </Section>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
