import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null , partyName: null, idDj:false},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    djLog: (state, action) => {
      state.value.idDJ = true;
    },
    getPartyName: (state, action) => {
        state.value.partyName = action.payload},
    getToken: (state, action) => {
        state.value.token = action.payload},    
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.partyName = null;
      state.value.idDj = false;
    },
  },
});

export const { djLog, logout , getPartyName, getToken} = userSlice.actions;
export default userSlice.reducer;
