import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";



export default configureStore({
    reducer: {
        auth : authSlice.reducer
    }
})