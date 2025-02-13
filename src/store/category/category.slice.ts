import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategory } from "../category/category.thunk";

export interface ICategory {
  _uuid: string;
  name: string;
  description: string;
}

interface categoryState {
  category: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: categoryState = {
  category: [],
  loading: false,
  error: null,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCategory.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.loading = false;
          state.error = null;
          state.category = action.payload;
        }
      )
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pets";
      });
  },
});

export default petsSlice.reducer;
