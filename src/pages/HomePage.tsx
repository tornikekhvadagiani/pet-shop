import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pets/pets.thunk";
import { AppDispatch, RootState } from "../store";
import { typeImages } from "../services/typeImagesAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface Pet {
  _uuid: string;
  name: string;
  image?: string;
  description?: string;
  isPopular: boolean;
}

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector(
    (state: RootState) => state.pets
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    );

  const popularPets = pets.filter((pet) => pet.isPopular);
  const topThreePets = pets.slice(0, 3);

  const getImage = (pet: Pet) => {
    return (
      pet.image ||
      typeImages.find((e) => e.title === pet.name)?.img ||
      "/default-image.jpg"
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-4">
      <div className="bg-white py-20 flex justify-center w-full">
        <div className="max-w-4xl w-full p-6 rounded-lg shadow-lg flex items-center gap-6">
          <div className="w-2/3">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="rounded-lg shadow-md"
            >
              {topThreePets.map((pet) => (
                <SwiperSlide key={pet._uuid}>
                  <img
                    src={getImage(pet)}
                    alt={pet.name}
                    className="w-full h-[400px]  rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-1/3 flex items-center">
            <p className="text-lg font-medium text-gray-900">
              {topThreePets[activeIndex]?.description ||
                "No description available."}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-12 mb-8 text-center">
        5 ყველაზე პოპულარული ცხოველი 🏆
      </h1>

      <div className="w-full max-w-4xl">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg shadow-lg"
        >
          {popularPets.slice(0, 5).map((pet) => (
            <SwiperSlide key={pet._uuid} className="flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64">
                <img
                  src={getImage(pet)}
                  alt={pet.name}
                  className="w-52 h-52 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">
                  {pet.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;
