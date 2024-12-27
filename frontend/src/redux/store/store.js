import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import listReducer from "../slices/listSlice";
import detailsReducer from "../slices/detailsSlice";
import cartReducer from "../slices/cartSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    list: listReducer,
    details: detailsReducer,
    cart: cartReducer,
  },
});
