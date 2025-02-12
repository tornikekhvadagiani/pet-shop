import { combineReducers, configureStore } from "@reduxjs/toolkit";
import petsReducer from "./pets/pets.slice";
// import categoriesReducer from "./category/category.slice";




const rootReducer = combineReducers({
  pets: petsReducer,
  // categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;
