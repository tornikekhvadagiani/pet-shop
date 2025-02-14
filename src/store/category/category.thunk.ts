import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "./category.slice";

export const fetchCategory = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: string }
>("pets/fetchPets", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_CATEGORY_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch pets");
    }

    const data = await res.json();
    console.log(data);
    return data.items as ICategory[];
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
