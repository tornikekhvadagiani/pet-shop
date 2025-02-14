import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleCart, toggleWishlist, closeAll } from "../store/modalSlice";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import { Link } from "react-router-dom";
import { MdPets } from "react-icons/md";
import { linksAPI } from "../services/linksAPI";

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

      <div className="flex items-center space-x-9 ">
        {linksAPI.map((e, i) => (
          <Link
            key={i}
            to={e.linkTo}
            className="hover:text-[#5f5f5f] transition text-[18px]"
          >
            {e.title}
          </Link>
        ))}
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
