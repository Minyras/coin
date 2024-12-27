import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addToCartItem,
  removeCartItem,
} from "../../coins/cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCartItem.rejected, (state, action) => {
        console.error("Error adding to cart:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.CoinID !== action.payload
        );
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
