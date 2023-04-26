import { configureStore } from '@reduxjs/toolkit';
import environmentReducer from '../components/environments/environmentSlice';
import workoutReducer from '../components/workouts/workoutSlice';

const store = configureStore({
  reducer: {
    environment: environmentReducer,
    workout: workoutReducer,
  }
});

export default store;