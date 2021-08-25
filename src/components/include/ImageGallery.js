import React from 'react'
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Box } from "@material-ui/core";
import styles from "../../styles/image-gallery.module.scss";

const ImageGallery = ({ images }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const items = [];

  for (let image of images) {
    items.push(
      <a href={image.src} className={styles["image-gallery-item"]} key={Math.random() * 1000}>
        <img alt="" src={image.thumbnail} style={{ width: "100%" }} />
      </a>
    );
  }

  return (
      <LightGallery
          elementClassNames={styles["custom-wrapper-class"]}
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
      >
          {items}
      </LightGallery>
  );
};

export default React.memo(ImageGallery);
