import { combineReducers, configureStore } from "@reduxjs/toolkit";
import petsReducer from "./pets/pets.slice";
import categoryReducer from "./category/category.slice";
import cartReducer from "./cart/cartSlice";
import modalReducer from "./modalSlice";
import wishlistReducer from "./wishlist/wishlist.slice";
import animalsWCategory from "./AnimalsWithCategory/animalsWithCategorySlice";

const rootReducer = combineReducers({
  pets: petsReducer,
  category: categoryReducer,
  cart: cartReducer,
  modal: modalReducer,
  wishlist: wishlistReducer,
  animalsWCategory: animalsWCategory,
});

export const store = configureStore({
  reducer: rootReducer,
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
