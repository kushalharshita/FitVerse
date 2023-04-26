import { createSlice } from '@reduxjs/toolkit';
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db, auth } from '../../firebase';

const initialState = {
    environments: [],
    status: 'idle',
    error: null,
};

const environmentSlice = createSlice({
    name: 'environment',
    initialState,
    reducers: {
       
        environmentsReceived: (state, action) => {
            state.status = 'succeeded';
            state.environments = action.payload;
        },
       
        environmentLoadFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },


        addEnvironment: (state, action) => {
            console.log("action:", action);
            state.environments.push(action.payload);

        },

        loadEnvironments: (state) => {
            state.status = 'loading';
        },
    },
});

export const selectEnvironments = (state) => {
    console.log(state);
    return state.environment.environments;

}
export const selectEnvironmentStatus = (state) => state.environment.status;

export const {
    environmentsLoading,
    environmentsReceived,
    environmentAdded,
    environmentLoadFailed,
    addEnvironment,
    loadEnvironments,
} = environmentSlice.actions;

export default environmentSlice.reducer;