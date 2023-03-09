import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cosmetic : []
}


export const cosmeticSlice = createSlice({
    name : "cosmetic",
    initialState,
        reducers : {
            loadCosmetic : (state, action) => {
                state.cosmetic = action.payload
            },
            
        }

})


export const {loadCosmetic} = cosmeticSlice.actions
export const selectCosmetic = (state) => state.cosmetic
export default cosmeticSlice.reducer