/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { pullAllBy } from 'lodash';
import routes from '../routes';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    channelAddFetchSuccess: (state, action) => {
      const { attributes: channel } = action.payload;

      state.channels.push(channel);
    },
    channelRenameFetchSuccess: (state, action) => {
      const { id, attributes: { name } } = action.payload;

      const [channel] = state.channels.filter((item) => item.id === id);
      channel.name = name;
    },
    channelRemoveFetchSuccess: (state, action) => {
      const { id } = action.payload;

      pullAllBy(state.channels, [{ id }], 'id');
    },
  },
});

const useChannelAddAsync = () => {
  const { addToast } = useToasts();

  const channelAddAsync = async (channel) => {
    try {
      const data = { attributes: { ...channel } };
      await axios.post(routes.channelsPath(), { data });
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelAddAsync', err);
    }
  };

  return {
    channelAddAsync,
  };
};

const useChannelRenameAsync = () => {
  const { addToast } = useToasts();

  const channelRenameAsync = async ({ id, name }) => {
    try {
      const data = { attributes: { name } };
      await axios.patch(routes.channelPath(id), { data });
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelRenameAsync', err);
    }
  };

  return {
    channelRenameAsync,
  };
};

const useChannelRemoveAsync = () => {
  const { addToast } = useToasts();

  const channelRemoveAsync = async ({ id }) => {
    try {
      await axios.delete(routes.channelPath(id));
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelRemoveAsync', err);
    }
  };

  return {
    channelRemoveAsync,
  };
};

const actions = { ...slice.actions };
export {
  actions,
  useChannelAddAsync,
  useChannelRenameAsync,
  useChannelRemoveAsync,
};
export default slice.reducer;
