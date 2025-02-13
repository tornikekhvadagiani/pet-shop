import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface WishlistItem {
  _uuid: string;
  name: string;
  priceUSD: number;
  isPopular: boolean;
  quantity: number;
  description: string;
  stock: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const loadWishlist = (): WishlistItem[] => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const initialState: WishlistState = {
  items: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(
        (item) => item._uuid === action.payload._uuid
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._uuid !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: RootState) => state.wishlist.items;

export default wishlistSlice.reducer;
