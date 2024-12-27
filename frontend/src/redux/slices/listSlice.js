import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCoinsByCategory,
  fetchPaginatedCoinsByList,
  getCoinsWithPagination,
  searchCoinsByName,
  searchCoinsInList,
} from "../../coins/list";
import {
  deleteCoin,
  fetchFilteredCoins,
  getCoins,
  updateCoin,
} from "../../coins/coin";

const listSlice = createSlice({
  name: "list",
  initialState: {
    coins: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoinsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchCoinsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCoinsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(searchCoinsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchFilteredCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCoin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoin.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(updateCoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoin.fulfilled, (state, action) => {
        const filteredCoins = state.coins.filter(
          (coin) => coin.CoinID !== action.payload
        );
        state.total -= 1;
        state.coins = filteredCoins;
      })
      .addCase(deleteCoin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getCoinsWithPagination.fulfilled, (state, action) => {
        state.coins = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getCoinsWithPagination.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchPaginatedCoinsByList.fulfilled, (state, action) => {
        state.coins = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPaginatedCoinsByList.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(searchCoinsInList.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.loading = false;
      })
      .addCase(searchCoinsInList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCoinsInList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default listSlice.reducer;
