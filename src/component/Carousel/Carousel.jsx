import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import "./styles.css";

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay]}
      className="flex items-center justify-center w-full h-[30vh] lg:h-[90vh]"
    >
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/2.JPG"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/3.JPG"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/1.JPG"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/4.JPG"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/5.JPG"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-full"
          src="/POSTERS/6.JPG"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}
