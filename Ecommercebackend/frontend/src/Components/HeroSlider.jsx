import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/GW/Jupiter/leadup/38-1._CB777134738_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044814._CB551384116_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_pc_2x._CB792409181_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/BFCM/Unrec/PC/5_3000x1200._CB777668691_.jpg",
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="w-full h-[400px]"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt="slider"
              className="w-full h-[100vh] object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
