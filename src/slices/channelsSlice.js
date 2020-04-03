/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import routes from '../routes';
// import { defaultChannelId/* , actions as appActions */} from './appSlice';

// const { startLoading, finishLoading } = appActions;

const slice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    processing: false,
  },
  reducers: {
    channelAddFetchSuccess: (state, action) => {
      const { id, attributes: channel } = action.payload;

      state.byId[id] = channel;
    },
    channelRenameFetchSuccess: (state, action) => {
      const { id, attributes: { name } } = action.payload;

      state.byId[id].name = name;
    },
    channelRemoveFetchSuccess: (state, action) => {
      const { id } = action.payload;

      delete state.byId[id];
    },
    channelActionRequest: (state) => {
      state.processing = true;
    },
    channelActionSuccess: (state) => {
      state.processing = false;
    },
    channelActionFailure: (state) => {
      state.processing = false;
    },
  },
});

const {
  channelActionRequest,
  channelActionSuccess,
  channelActionFailure,
} = slice.actions;

const useChannelAddAsync = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const channelAddAsync = async (channel, callback) => {
    dispatch(channelActionRequest());
    try {
      const data = { attributes: { ...channel } };
      await axios.post(routes.channelsPath(), { data });
      dispatch(channelActionSuccess());
    } catch (err) {
      dispatch(channelActionFailure());
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelAddAsync', err);
      throw err;
    } finally {
      callback();
    }
  };

  return {
    channelAddAsync,
  };
};

const useChannelRenameAsync = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const channelRenameAsync = async ({ id, name }, callback) => {
    dispatch(channelActionRequest());
    try {
      const data = { attributes: { name } };
      await axios.patch(routes.channelPath(id), { data });
      dispatch(channelActionSuccess());
    } catch (err) {
      dispatch(channelActionFailure());
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelRenameAsync', err);
      throw err;
    } finally {
      callback();
    }
  };

  return {
    channelRenameAsync,
  };
};

const useChannelRemoveAsync = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const channelRemoveAsync = async ({ id }, callback) => {
    dispatch(channelActionRequest());
    try {
      await axios.delete(routes.channelPath(id));
      dispatch(channelActionSuccess());
    } catch (err) {
      dispatch(channelActionFailure());
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      console.log('channelRemoveAsync', err);
      throw err;
    } finally {
      callback();
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
