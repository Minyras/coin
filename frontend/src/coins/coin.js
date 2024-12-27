import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCoins = createAsyncThunk(
  "coins/getCoins",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/coins");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCoinDetails = createAsyncThunk(
  "coins/fetchCoinDetails",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/details/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCoins = createAsyncThunk(
  "coins/fetchFilteredCoins",
  async (filters, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:3000/filter?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCoin = createAsyncThunk(
  "coins/deleteCoin",
  async (coinId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/coins/${coinId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the coin.");
      }
      return coinId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateViewCount = createAsyncThunk(
  "coins/updateViewCount",
  async (coinId, thunkAPI) => {
    try {
      await fetch(`http://localhost:3000/coins/${coinId}`, {
        method: "POST",
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCoin = createAsyncThunk(
  "coins/createCoin",
  async (formData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the new coin.");
      }
      await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCoin = createAsyncThunk(
  "coins/updateCoin",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/newcoin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the coin.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
