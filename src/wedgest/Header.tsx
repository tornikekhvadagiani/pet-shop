import React, { useState } from "react";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import CartPage from '../pages/CartPage'; 
import WishlistPage from "../pages/WishlistPage";
import { NavLink } from "react-router-dom";
import { MdPets } from "react-icons/md";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);  

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);  
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="p-4 top-[51px] bg-[#FFD59E] text-black text-[22px] flex items-center justify-between">
      <h1 className="text-2xl">  
       <MdPets size={40} color="#00A36C" />
      </h1>
     

      <div className="flex items-center space-x-4">
        <NavLink to="/" className="hover:text-gray-400 hover:font-bold">Home</NavLink>
        <NavLink to="animals" className="hover:text-gray-400 hover:font-bold">Animals</NavLink>
        <NavLink to="category" className="hover:text-gray-400 hover:font-bold">Category</NavLink>
      </div>

      <div className="pr-[30px] flex items-center space-x-4">
        <a href="#" onClick={toggleCart} className="hover:text-gray-400">
          <FaHeart />
        </a>
        <a href="#" onClick={toggleCart} className="hover:text-gray-400">
        <FaShoppingCart />
        </a>
      </div>

      {isCartOpen && <CartPage onClose={closeCart} />}
      {isCartOpen && <WishlistPage onClose={closeCart} />} 
    </div>
  );
};

export default Header;
