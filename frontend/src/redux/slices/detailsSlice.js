import { createSlice } from "@reduxjs/toolkit";
import { fetchCoinDetails } from "../../coins/coin";

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    coin: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.coin = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default detailsSlice.reducer;
