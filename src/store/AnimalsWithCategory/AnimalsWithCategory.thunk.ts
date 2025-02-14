import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnimalWithCategory } from "./animalsWithCategorySlice";
import { toast } from "react-toastify";

export const fetchAnimalsWithCategories = createAsyncThunk<
  IAnimalWithCategory[],
  void,
  { rejectValue: string }
>("animals/fetchAnimalsWithCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/animals_with_categories`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_ANIMALS_WITH_CATEGORY_KEY
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.items.map((item: IAnimalWithCategory) => ({
      _uuid: item._uuid,
      animal: item.animal ?? {
        isPopular: false,
        name: "",
        description: "",
        priceUSD: "0",
        stock: "0",
      },
      category: item.category ?? { name: "", description: "" },
    }));
  } catch (error: any) {
    toast.error("Failed to fetch animals with categories.");
    return rejectWithValue(error.message);
  }
});
