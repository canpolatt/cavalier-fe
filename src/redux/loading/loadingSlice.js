import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name:"loading",
    initialState:{
        isLoading:"initial"
    },
    reducers:{
        setIsLoading:(state,action) => {
            state.isLoading = action.payload;
        }
    },
})

export const {setIsLoading} = loadingSlice.actions;
export default loadingSlice.reducer;