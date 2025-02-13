import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromWishlist } from "../store/wishlist/wishlist.slice";
import { addToCart, CartItem } from "../store/cart/cartSlice";
import { typeImages } from "../services/typeImagesAPI";

interface WishlistPageProps {
  onClose: () => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const subtotal = wishlist.reduce((acc, item) => acc + item.priceUSD, 0);

  const handleAddToCart = (item: CartItem) => {
    const cartItem: CartItem = {
      _uuid: item._uuid,
      name: item.name,
      description: item.description,
      priceUSD: item.priceUSD,
      quantity: item.quantity,
      stock: item.stock ?? 0,
      isPopular: item.isPopular ?? false,
    };

    dispatch(addToCart(cartItem));
    dispatch(removeFromWishlist(item._uuid));
  };

  const filterImage = (title: string) => {
    return (
      typeImages.find((e) => e.title === title)?.img || "/default-image.jpg"
    );
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md flex flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Wishlist
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul role="list" className="-my-6 divide-y divide-gray-200 mt-8">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <li key={item._uuid} className="flex py-6">
                      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={filterImage(item.name)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.priceUSD}</p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                          <button
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                            onClick={() =>
                              dispatch(removeFromWishlist(item._uuid))
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg mt-10">
                    Your wishlist is empty.
                  </p>
                )}
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 mt-6"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
