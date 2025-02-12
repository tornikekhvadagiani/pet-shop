import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pets/pets.thunk";
import { AppDispatch, RootState } from "../store";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector((state: RootState) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">Error: {error}</div>;
  if (!pets.length) return <div className="text-center text-gray-500 text-lg mt-10">No pets available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
      {pets.map((pet) => (
        <div
          key={pet._uuid}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
          <p className="text-gray-600 text-sm text-center mb-4">{pet.description}</p>
          <p className="text-lg font-semibold text-gray-800 mt-3">
            Price: <span className="text-green-500">{pet.priceUSD} USD</span> /{" "}
            <span className="text-blue-500">{pet.priceGEL} GEL</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
