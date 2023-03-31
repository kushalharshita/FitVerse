import { createSlice } from '@reduxjs/toolkit';

export const environmentSlice = createSlice({
  name: 'environments',
  initialState: {
    name: '',
    description: '',
    time: '',
    weekDay: '',
    restTime: '',
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setWeekDay: (state, action) => {
      state.weekDay = action.payload;
    },
    setRestTime: (state, action) => {
      state.restTime = action.payload;
    },
  },
});

export const { setName, setDescription, setTime, setWeekDay, setRestTime } = environmentSlice.actions;

export default environmentSlice.reducer;


