import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/users";
import environmentsReducer from "./users/environmentSlice"







export default configureStore({
    reducer:{
     user: userReducer,
     

    }
});