/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';
import app from '../app/appSlice';

const { startLoading, finishLoading } = app.actions;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: { byId: {}, allIds: [] },
  },
  reducers: {
    messageAdd(state, action) {
      const { id, attributes: message } = action.payload;
      state.byId[id] = message;
      state.allIds.push(id);
    },
  },
});

const messageAddAsync = (message) => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const { currentChannelId } = getState().app;
    const data = { attributes: { ...message, date: new Date() } };
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

export default { ...messagesSlice, actions: { ...messagesSlice.actions, messageAddAsync } };
