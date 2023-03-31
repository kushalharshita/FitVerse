// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { 
//     user : { } , 
//     loading : "false",
//     error : "false",
// }


// const userSlice = createSlice({
//     name: 'user',
//     initialState, 
//     reducers: {
//         getUser : state => {
//             state.loading = "true";
        
//         },
//         getUserSuccess: (state,{payload}) =>{
//             state.user = payload;
//             state.error = "false";
//             state.loading = "false";
//         },

//         getUserFailure: state=>{
//             state.loading = "false";
//             state.error = "true";
//         }
//     }

// })

// export const {getUser , getUserFailure , getUserSuccess} = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: null,
    loading: false,
    error: null
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      const { uid, displayName, email } = action.payload;
      state.user = { uid, displayName, email };
      state.error = false;
      state.loading = false;
    },
    getUserFailure: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getUser, getUserFailure, getUserSuccess } = userSlice.actions;
export default userSlice.reducer;
