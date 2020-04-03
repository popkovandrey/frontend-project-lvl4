/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const defaultModalName = 'none';
const defaultChannelId = 1;

const slice = createSlice({
  name: 'app',
  initialState: {
    currentChannelId: null,
    modalName: defaultModalName,
  },
  reducers: {
    showModal: (state, action) => { state.modalName = action.payload.modalName; },
    hideModal: (state) => { state.modalName = defaultModalName; },
    setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload.id; },
  },
  extraReducers: {
    [channelsActions.channelAddFetchSuccess]: (state, { payload }) => {
      const { id } = payload;
      state.currentChannelId = id;
    },
    [channelsActions.channelRemoveFetchSuccess]: (state) => {
      state.currentChannelId = defaultChannelId;
    },
  },
});

const actions = { ...slice.actions };
export { actions };
export default slice.reducer;
