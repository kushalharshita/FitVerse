import { createSlice } from '@reduxjs/toolkit';

const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    error: null,

  },
  reducers: {
    
    addWorkout : (state, action)=>{
        state.workouts.push(action.payload)
    },

    
    
  },
});

export const selectWorkouts = (state) => {
    console.log(state);
    return state.workout.workouts;
}

export const { addWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
