
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total: [] ,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products= action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setProducts, setTotal } = productSlice.actions;
export default productSlice.reducer;

