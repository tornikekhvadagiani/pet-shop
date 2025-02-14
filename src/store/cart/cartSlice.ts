import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _uuid: string;
  name: string;
  priceUSD: number;
  quantity: number;
  isPopular: boolean;
  description: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const savedCart = localStorage.getItem("cart");
const initialState: CartState = savedCart
  ? JSON.parse(savedCart)
  : {
      items: [],
      total: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._uuid === action.payload._uuid
      );

      if (existingItem) {
      
        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        } else {
          existingItem.quantity = newQuantity;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.priceUSD * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._uuid !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.priceUSD * item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ _uuid: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item._uuid === action.payload._uuid
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.priceUSD * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
