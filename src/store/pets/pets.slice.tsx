import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPets } from "./pets.thunk";

interface Pet {
  _uuid: string;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  isPopular: boolean;
  stock: number;
}

interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.loading = false;
        state.error = null;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pets";
      });
  },
});

export default petsSlice.reducer;
