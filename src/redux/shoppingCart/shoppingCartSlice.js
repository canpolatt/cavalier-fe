import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

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
      setCookie("cart", JSON.stringify({products:state.products,quantity:state.quantity,totalPrice:state.total}),1);
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
      setCookie("cart", JSON.stringify({products:state.products,quantity:state.quantity,totalPrice:state.total}),1);
    },
    backToInitialState: () => {
      document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      return initialState;
    },
    fillWithCookie: (state,action) => {
      const cookieCart = JSON.parse(action.payload.substr(5));
      state.products = [...cookieCart.products];
      state.quantity = cookieCart.quantity;
      state.total = cookieCart.totalPrice;
    }
  },
});

export const { addCart, removeFromCart, backToInitialState, fillWithCookie } = cartSlice.actions;
export default cartSlice.reducer;
