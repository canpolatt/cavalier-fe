import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = state.products.find(
        (item) =>
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          item.id === action.payload.id
      );
      if (product) {
        product.quantity++;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const product = state.products.find(
        (item) =>
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          item.id === action.payload.id
      );
      const index = state.products.indexOf(product);
      if (product.quantity === 1) {
        state.products.splice(index, 1);
        state.quantity -= 1;
      } else {
        product.quantity--;
      }
      state.total -= action.payload.price;
    },
    backToInitialState: () => {
      return initialState;
    },
  },
});

export const { addCart, removeFromCart, backToInitialState } = cartSlice.actions;
export default cartSlice.reducer;
