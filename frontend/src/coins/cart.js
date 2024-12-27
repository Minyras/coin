import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/cart/1");
      if (!response.ok) {
        throw new Error("Failed to add the item to the cart.");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addToCartItem = createAsyncThunk(
  "cart/addItem",
  async ({ userId, coinId }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          coinId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the item to the cart.");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Add to cart error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, coinId }) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${userId}/${coinId}`);
      return coinId;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
