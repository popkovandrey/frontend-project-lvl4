/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useStore } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    processingSendMessage: false,
  },
  reducers: {
    messageFetchSuccess: (state, action) => {
      const { attributes: message } = action.payload;
      state.messages.push(message);
    },
    messageSendRequest: (state) => {
      state.processingSendMessage = true;
    },
    messageSendSuccess: (state) => {
      state.processingSendMessage = false;
    },
    messageSendFailure: (state) => {
      state.processingSendMessage = false;
    },
  },
});

const {
  messageSendRequest,
  messageSendSuccess,
  messageSendFailure,
} = slice.actions;

const useMessageAddAsync = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const { addToast } = useToasts();

  const messageAddAsync = async (message) => {
    dispatch(messageSendRequest());
    try {
      const { currentChannelId } = store.getState().app;
      const data = { attributes: { ...message, date: new Date() } };
      await axios.post(routes.channelMessagesPath(currentChannelId), { data });
      dispatch(messageSendSuccess());
    } catch (err) {
      dispatch(messageSendFailure());
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('messageAddAsync', err);
      throw err;
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
