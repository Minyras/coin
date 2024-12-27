import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoinsByCategory = createAsyncThunk(
  "list/fetchCoinsByCategory",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/list/${id}`);
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

export const searchCoinsByName = createAsyncThunk(
  "list/searchCoinsByName",
  async (name, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/search?name=${name}`);
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

export const searchCoinsInList = createAsyncThunk(
  "list/searchCoinsInList",
  async ({ listId, searchTerm }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/list/${listId}/search?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCoinsWithPagination = createAsyncThunk(
  "list/getCoinsWithPagination",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/coin?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coins.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPaginatedCoinsByList = createAsyncThunk(
  "list/fetchPaginatedCoinsByList",
  async ({ id, page, limit }, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/list/${id}/paginated?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch paginated coins for the list.");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
