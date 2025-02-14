import { createAsyncThunk } from "@reduxjs/toolkit";
interface IAnimalsMainData {}
export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (
    { uuid, formData }: { uuid: string; formData: IAnimalsMainData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/animals/${uuid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PETS_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update animal");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
