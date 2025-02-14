import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface WishlistItem {
  _uuid: string;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  stock: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!state.items.find(item => item._uuid === action.payload._uuid)) {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._uuid !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist.items;
export default wishlistSlice.reducer;
