import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addCart: (state, action) => {
      const product = state.products.find(
        (item) =>
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (product) {
        product.quantity++;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }
      state.total += action.payload.price;
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
