import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleCart, toggleWishlist, closeAll } from "../store/modalSlice";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import { NavLink } from "react-router-dom";
import { MdPets } from "react-icons/md";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { cartOpen, wishlistOpen } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <div className="p-4 top-[51px] bg-[#FFD59E] text-black text-[22px] flex items-center justify-between">
      <h1 className="text-2xl">
        <MdPets size={40} color="#00A36C" />
      </h1>

      <div className="flex items-center space-x-4">
        <NavLink to="/" className="hover:text-gray-400 hover:font-bold">
          Home
        </NavLink>
        <NavLink to="animals" className="hover:text-gray-400 hover:font-bold">
          Animals
        </NavLink>
        <NavLink to="category" className="hover:text-gray-400 hover:font-bold">
          Category
        </NavLink>
      </div>

      <div className="pr-[30px] flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleWishlist())}
          className="hover:text-gray-400"
        >
          <FaHeart className="cursor-pointer" />
        </button>
        <button
          onClick={() => dispatch(toggleCart())}
          className="hover:text-gray-400"
        >
          <FaShoppingCart className="cursor-pointer" />
        </button>
      </div>

      {cartOpen && <CartPage onClose={() => dispatch(closeAll())} />}
      {wishlistOpen && <WishlistPage onClose={() => dispatch(closeAll())} />}
    </div>
  );
};

export default Header;
