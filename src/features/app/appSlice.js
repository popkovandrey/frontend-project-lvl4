/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultModalName = 'none';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentChannelId: null,
    isLoading: false,
    modalName: defaultModalName,
  },
  reducers: {
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload.id; },
    startLoading: (state) => { state.isLoading = true; },
    finishLoading: (state) => { state.isLoading = false; },
    showModal: (state, action) => { state.modalName = action.payload.modalName; },
    hideModal: (state) => { state.modalName = defaultModalName; },
  },
});

export const defaultChannelId = 1;
export default appSlice;
