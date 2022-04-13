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
    },
    // there is a bug in here.If color and size overrides.
    // when going previous page there is a bug too.
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
