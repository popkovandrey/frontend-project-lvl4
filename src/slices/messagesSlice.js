/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { pullAllBy } from 'lodash';
import routes from '../routes';
import { actions as channelsActions } from './channelsSlice';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    messageFetchSuccess: (state, action) => {
      const { attributes: message } = action.payload;
      state.messages.push(message);
    },
  },
  extraReducers: {
    [channelsActions.channelRemoveFetchSuccess]: (state, { payload }) => {
      const { id } = payload;
      pullAllBy(state.messages, [{ channelId: id }], 'channelId');
    },
  },
});

const useMessageAddAsync = () => {
  const store = useStore();
  const { addToast } = useToasts();

  const messageAddAsync = async (message) => {
    try {
      const { currentChannelId } = store.getState().app;
      const data = { attributes: { ...message, date: new Date() } };
      await axios.post(routes.channelMessagesPath(currentChannelId), { data });
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('messageAddAsync', err);
    }
  };

  return {
    messageAddAsync,
  };
};

const actions = { ...slice.actions };
export {
  actions,
  useMessageAddAsync,
};
export default slice.reducer;
