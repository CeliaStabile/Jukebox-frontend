import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null , partyName: null, isDj:false},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    djLog: (state, action) => {
      state.value.isDj = true;
    },
    guestLog: (state, action) => {
      state.value.isDj = false;
    },
    getPartyName: (state, action) => {
        state.value.partyName = action.payload},
    getToken: (state, action) => {
        state.value.token = action.payload},    
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.partyName = null;
      state.value.isDj = false;
    },
  },
});

export const { djLog, logout , getPartyName, getToken, guestLog} = userSlice.actions;
export default userSlice.reducer;
