import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null , partyName: null, isDj:false, suggestions:[]},
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

    addSuggestion: (state, action) => {
   state.value.suggestions.push(action.payload);
   },

   removeSuggestion: (state, action) => {
    state.value.suggestions = state.value.suggestions.filter(suggestion => suggestion.title !== action.payload.title);
  },
      
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.partyName = null;
      state.value.isDj = false;
    },
  },
});

export const { djLog, logout , getPartyName, getToken, guestLog, addSuggestion, removeSuggestion} = userSlice.actions;
export default userSlice.reducer;
