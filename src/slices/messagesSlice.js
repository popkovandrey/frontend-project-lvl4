/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { remove } from 'lodash';
import routes from '../routes';
import { actions as channelsActions } from './channelsSlice';
import { getCurrentChannelId } from '../selectors';

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
      remove(state.messages, (message) => message.channelId === id);
    },
  },
});

const useAddMessage = () => {
  const currentChannelId = useSelector((state) => getCurrentChannelId(state));
  const { addToast } = useToasts();

  const addMessage = async (message) => {
    try {
      const data = { attributes: { ...message, date: new Date() } };
      await axios.post(routes.channelMessagesPath(currentChannelId), { data });
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('messageAddAsync', err);
    }
  };

  return {
    addMessage,
  };
};

const actions = { ...slice.actions };
export {
  actions,
  useAddMessage,
};
export default slice.reducer;
