/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { currentChannelId: null },
  reducers: {
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload.id; },
  },
});

export const defaultChannelId = 1;
export default appSlice;
