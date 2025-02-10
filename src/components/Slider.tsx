import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

interface Slide {
  image: string;
  title: string;
}

interface SliderProps {
  slides: Slide[];
}

export const Slider = ({ slides }: SliderProps) => {
  const handleSwiper = (swiper: SwiperType) => {
    console.log(swiper);
  };

  return (
    <div className="swiper-container w-4/5 max-w-screen-xl h-full mx-auto py-5 flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('Slide changed')}
        onSwiper={handleSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide flex flex-col justify-center items-center h-full"
          >
            <h3 className="w-full text-center text-gray-900 text-lg font-bold py-2">
              {slide.title}
            </h3>
            <img
              className="w-full h-60 object-cover rounded-lg"
              src={slide.image}
              alt={slide.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
