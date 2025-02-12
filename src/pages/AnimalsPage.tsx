import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pets/pets.thunk";
import { AppDispatch, RootState } from "../store";
import { typeImages } from "../services/typeImagesAPI";
import { FaHeart, FaExchangeAlt } from "react-icons/fa"; 

interface Pet {
  _uuid: string;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  isPopular: boolean;
  stock: number;
}

const AnimalsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">Error: {error}</div>;
  if (!pets.length) return <div className="text-center text-gray-500 text-lg mt-10">No pets available.</div>;

  const filterImage = (title: string) => {
    return typeImages.find((e) => e.title === title)?.img || "/default-image.jpg";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100 min-h-screen">
      {pets.map((pet: Pet) => (
        <div
          key={pet._uuid}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">{pet.name}</h3>
          <img
            src={filterImage(pet.name)}
            alt={pet.name}
            className="w-52 h-52 object-cover rounded-lg mb-3"
          />
          <p className="text-gray-600 text-sm text-center">{pet.description}</p>
          <p className="text-base font-semibold text-gray-800 mt-2">
            Price: <span className="text-green-500">{pet.priceUSD} USD</span> / <span className="text-blue-500">{pet.priceGEL} GEL</span>
          </p>
          <div className="flex gap-3 mt-3">
            <button className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-600 transition-all">
              Buy now
            </button>

            <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-300 transition-all">
              <FaExchangeAlt />
              Convert
            </button>

            <button className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition-all">
              <FaHeart />
              Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalsPage;
