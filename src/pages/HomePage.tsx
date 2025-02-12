import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pets/pets.thunk";
import { AppDispatch, RootState } from "../store";
import { typeImages } from "../services/typeImagesAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // React icons for social media


interface Pet {
  _uuid: string;
  name: string;
  image?: string;
  isPopular: boolean;
}


const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">Error: {error}</div>;

  const popularPets = pets.filter((pet) => pet.isPopular).slice(0, 5);

  if (!popularPets.length)
    return <div className="text-center text-gray-500 text-lg mt-10">No popular pets available.</div>;

  const getImage = (pet: Pet) => {
    return pet.image || typeImages.find((e) => e.title === pet.name)?.img || "/default-image.jpg";
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
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
          {popularPets.map((pet) => (
            <SwiperSlide key={pet._uuid} className="flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-64">
                <img
                  src={getImage(pet)}
                  alt={pet.name}
                  className="w-52 h-52 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">{pet.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <footer className="w-11/12 sm:w-7/12 bg-gray-800 text-white mt-10 py-6 rounded-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-2xl font-semibold mb-2">PetShop</h2>
              <p className="text-sm">
                Welcome to PetShop, your ultimate destination for adopting and purchasing pets.
                We offer a wide range of animals, from dogs and cats to exotic creatures, all ready to find their forever home.
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="text-sm">📍 Tbilisi, Georgia</p>
                <p className="text-sm">📞 +995 123 456 789</p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


