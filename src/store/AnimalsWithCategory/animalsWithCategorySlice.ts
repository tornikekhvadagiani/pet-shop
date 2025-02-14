import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAnimalsWithCategories } from "./AnimalsWithCategory.thunk";

export interface IAnimalWithCategory {
  _uuid: string;
  name: string;
  description: string;
  priceUSD: string;
  stock: string;
  isPopular: boolean;
  _created: number;
  _modified: number;
  _data_type: string;
  _is_deleted: boolean;
  _self_link: string;
  _user: string;
  animal: {
    uuid: string;
    isPopular: boolean;
    name: string;
    description: string;
    priceUSD: string;
    stock: string;
  };
  category: {
    uuid: string;
    name: string;
    description: string;
  };
}

interface AnimalsWithCategoryState {
  animalsWithCategory: IAnimalWithCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimalsWithCategoryState = {
  animalsWithCategory: [],
  loading: false,
  error: null,
};

const animalsWithCategorySlice = createSlice({
  name: "animalsWithCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalsWithCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAnimalsWithCategories.fulfilled,
        (state, action: PayloadAction<IAnimalWithCategory[]>) => {
          state.loading = false;
          state.error = null;
          state.animalsWithCategory = action.payload;
        }
      )
      .addCase(fetchAnimalsWithCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch animals with category";
      });
  },
});

export default animalsWithCategorySlice.reducer;
