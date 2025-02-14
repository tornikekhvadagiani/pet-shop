import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/pets/pets.thunk";
import { AppDispatch, RootState } from "../store";
import { typeImages } from "../services/typeImagesAPI";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useDolarToGel } from "../customHooks/useDolarToGel";
import { addToCart } from "../store/cart/cartSlice";
import { toast } from "react-toastify";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/wishlist/wishlist.slice";
import AnimalDetailsModal from "../components/AnimalDetailsModat";

interface Pet {
  _uuid: string;
  name: string;
  priceUSD: number;
  quantity: number;
  description: string;
  isPopular: boolean;
  stock: number;
}

const AnimalsPage = () => {
  const [gelPrice, setGelPrice] = useState<number>();
  const [selectedAnimal, setSelectedAnimal] = useState<Pet | null>(null); // Track selected animal

  useEffect(() => {
    useDolarToGel().then((rate) => setGelPrice(rate));
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error } = useSelector(
    (state: RootState) => state.pets
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (loading && gelPrice)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    );
  if (!pets.length)
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No pets available.
      </div>
    );

  const handleAddToCart = (pet: Pet) => {
    if (pet.stock <= 0) {
      toast.error("Out Of Stock !!");
      return;
    }

    const existingItem = cartItems.find((item) => item._uuid === pet._uuid);

    if (existingItem) {
      if (existingItem.quantity >= pet.stock) {
        toast.error("Out Of Stock !!");
        return;
      }

      dispatch(
        addToCart({
          ...existingItem,
          quantity: 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          ...pet,
          quantity: 1, // Start at 1
        })
      );
    }

    toast.success(`${pet.name} added to cart! 🛒`);
  };

  const handleToggleWishlist = (pet: Pet) => {
    const isInWishlist = wishlistItems.some((item) => item._uuid === pet._uuid);

    if (isInWishlist) {
      dispatch(removeFromWishlist(pet._uuid));
      toast.info(`${pet.name} removed from wishlist!`);
    } else {
      dispatch(addToWishlist({ ...pet, quantity: 1 }));
      toast.success(`${pet.name} added to wishlist! `);
    }
  };

  const filterImage = (title: string) => {
    return (
      typeImages.find((e) => e.title === title)?.img || "/default-image.jpg"
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100 min-h-screen">
      {pets.map((pet) => {
        const isInWishlist = wishlistItems.some(
          (item) => item._uuid === pet._uuid
        );

        return (
          <div
            key={pet._uuid}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center transition-transform transform  "
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{pet.name}</h3>
            <img
              src={filterImage(pet.name)}
              alt={pet.name}
              className="w-52 h-52 object-cover rounded-lg mb-3"
            />
            <p className="text-gray-600 text-sm text-center">
              {pet.description}
            </p>
            <p className="text-base font-semibold text-gray-800 mt-2">
              Price: <span className="text-green-500">{pet.priceUSD} USD</span>{" "}
              /
              <span className="text-blue-500">
                {gelPrice ? (pet.priceUSD * gelPrice).toFixed(2) + "₾" : ""}
              </span>
            </p>
            <div className="flex gap-3 mt-3">
              <button
                className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-300 transition-all"
                onClick={() => handleAddToCart(pet)}
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button
                className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition-all"
                onClick={() => handleToggleWishlist(pet)}
              >
                {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                Wishlist
              </button>
              <button
                className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-blue-600 transition-all"
                onClick={() => setSelectedAnimal(pet)} // Set selected animal
              >
                See Details
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal: Show when an animal is selected */}
      {selectedAnimal && (
        <AnimalDetailsModal
          name={selectedAnimal.name}
          description={selectedAnimal.description}
          priceUSD={selectedAnimal.priceUSD}
          isPopular={selectedAnimal.isPopular}
          stock={selectedAnimal.stock}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
};

export default AnimalsPage;
