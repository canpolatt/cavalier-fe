import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addCart:(state,action)=>{
            const findProduct = state.products.find(product=>product._id === action.payload._id);
            if(findProduct){
                const findIndex = state.products.indexOf(findProduct);
                state.products[findIndex] = action.payload;
            }else{
                state.products.push(action.payload);
            }
            state.quantity +=1;
            state.total += action.payload.price;
        },
        // there is a bug in here.If color and size overrides.
        // when going previous page there is a bug too.
    },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;