import { createAsyncThunk } from "@reduxjs/toolkit";

interface Pet {
  _uuid: string;
  name: string;
  priceUSD: number | string;
  quantity: number;
  description: string;
  isPopular: boolean;
  stock: number | string;
}

export const fetchPets = createAsyncThunk<Pet[], void, { rejectValue: string }>(
  "pets/fetchPets",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/animals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PETS_KEY}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data = await res.json();
      console.log("API Response:", data.items);

      return data.items as Pet[];
    } catch {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
