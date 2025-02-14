import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { typeImages } from "../services/typeImagesAPI";
import { updateAnimal } from "../store/updateStockThunks";
import { clearCart } from "../store/cart/cartSlice";
import { toast } from "react-toastify";

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.priceUSD * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const updateRequests = cart.map((item) => {
        const updatedData = {
          name: item.name,
          priceUSD: item.priceUSD,
          description: item.description,
          stock: String(item.stock - item.quantity),
          isPopular: Boolean(item.isPopular),
        };

        return dispatch(
          updateAnimal({ uuid: item._uuid, formData: updatedData })
        ).unwrap();
      });

      await Promise.all(updateRequests);

      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const filterImage = (title: string) => {
    return (
      typeImages.find((e) => e.title === title)?.img || "/default-image.jpg"
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._uuid}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
              >
                <div className="flex items-center">
                  <div className="w-24 h-24 mr-4 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={filterImage(item.name)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="text-lg font-bold">
                  ${(item.priceUSD * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end items-center">
            <span className="text-xl font-bold mr-4">
              Subtotal: ${subtotal.toFixed(2)}
            </span>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={handleCheckout}
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      <div className="mt-8">
        <Link to="/" className="text-indigo-600 hover:underline">
          &larr; Back to Products
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
