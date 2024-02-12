import { Carousel } from "@material-tailwind/react";
import { CarouselImages } from "../data/constant";

const CarouselDefault = () => {
  return (
    <Carousel
      className="rounded-xl"
      autoplay
      loop
      autoplayDelay={3000}
      transition={{ type: "tween", duration: 1 }}
    >
      {CarouselImages.map((image, index) => (
        <img
          key={index}
          src={image.image}
          alt="image 1"
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default CarouselDefault;
