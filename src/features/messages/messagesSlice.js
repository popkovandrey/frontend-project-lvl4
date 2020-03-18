/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: { byId: {}, allIds: [] },
  },
  reducers: {
    addMessage(state, action) {
      const { id, attributes: message } = action.payload;
      state.byId[id] = message;
      state.allIds.push(id);
    },
  },
});

const addMessageAsync = (message) => async (dispatch, getState) => {
  try {
    const { currentChannelId } = getState().app;
    const data = { attributes: { ...message, date: new Date() } };
    await axios.post(routes.channelMessagesPath(currentChannelId), { data });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default { ...messagesSlice, actions: { ...messagesSlice.actions, addMessageAsync } };
