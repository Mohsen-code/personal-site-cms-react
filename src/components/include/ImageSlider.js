import { Typography } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import styles from "../../styles/slider.module.scss";

const ImageSlider = ({ images = [], height = 210 }) => {
  const sliderItems = [];
  for (let index = 0; index < images.length; index++) {
    sliderItems.push(
      images[index].src && (
        <SwiperSlide key={index}>
          <div className={styles["image-card"]}>
            <figure>
              <img
                src={images[index].src}
                alt=""
              />
            </figure>
            <figcaption>
              <Typography variant="h5">{images[index].title || ""}</Typography>
              <Typography variant="subtitle1">
                {images[index].subTitle || ""}
              </Typography>
            </figcaption>
          </div>
        </SwiperSlide>
      )
    );
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      autoplay={true}
    >
      {sliderItems}
    </Swiper>
  );
};

export default ImageSlider;
