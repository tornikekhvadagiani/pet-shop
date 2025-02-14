import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  cartOpen: boolean;
  wishlistOpen: boolean;
}

const initialState: ModalState = {
  cartOpen: false,
  wishlistOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
      state.wishlistOpen = false; 
    },
    toggleWishlist: (state) => {
      state.wishlistOpen = !state.wishlistOpen;
      state.cartOpen = false; 
    },
    closeAll: (state) => {
      state.cartOpen = false;
      state.wishlistOpen = false;
    },
  },
});

export const { toggleCart, toggleWishlist, closeAll } = modalSlice.actions;
export default modalSlice.reducer;
