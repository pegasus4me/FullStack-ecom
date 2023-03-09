
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
 import basketReducer from "./basketSlice"
import cosmeticReducer from './cosmeticSlices'

const store = configureStore({
    reducer : {
        user : userReducer, 
        basket : basketReducer,
        cosmetic : cosmeticReducer,
    }
})

export default store