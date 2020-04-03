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
    channelRemoveRequest: (state) => {
      state.processing = true;
    },
    channelRemoveSuccess: (state) => {
      state.processing = false;
    },
    channelRemoveFailure: (state) => {
      state.processing = false;
    },
    channelRenameRequest: (state) => {
      state.processing = true;
    },
    channelRenameSuccess: (state) => {
      state.processing = false;
    },
    channelRenameFailure: (state) => {
      state.processing = false;
    },
    channelAddRequest: (state) => {
      state.processing = true;
    },
    channelAddSuccess: (state) => {
      state.processing = false;
    },
    channelAddFailure: (state) => {
      state.processing = false;
    },
  },
});

const {
  channelRemoveRequest,
  channelRemoveSuccess,
  channelRemoveFailure,
  channelRenameRequest,
  channelRenameSuccess,
  channelRenameFailure,
  channelAddRequest,
  channelAddSuccess,
  channelAddFailure,
} = slice.actions;

const useChannelAddAsync = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const channelAddAsync = async (channel, callback) => {
    dispatch(channelAddRequest());
    try {
      const data = { attributes: { ...channel } };
      await axios.post(routes.channelsPath(), { data });
      dispatch(channelAddSuccess());
    } catch (err) {
      dispatch(channelAddFailure());
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
    dispatch(channelRenameRequest());
    try {
      const data = { attributes: { name } };
      await axios.patch(routes.channelPath(id), { data });
      dispatch(channelRenameSuccess());
    } catch (err) {
      dispatch(channelRenameFailure());
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
    dispatch(channelRemoveRequest());
    try {
      await axios.delete(routes.channelPath(id));
      dispatch(channelRemoveSuccess());
    } catch (err) {
      dispatch(channelRemoveFailure());
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

/* const channelAddAsync = (channel) => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const data = { attributes: { ...channel } };
    await axios.post(routes.channelsPath(), { data });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // dispatch(finishLoading());
  }
};

const channelRenameAsync = ({ id, name }) => async (dispatch) => {
  // dispatch(startLoading());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // dispatch(finishLoading());
  }
};

const channelRemoveAsync = ({ id }) => async (dispatch) => {
  // dispatch(startLoading());
  try {
    await axios.delete(routes.channelPath(id));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // dispatch(finishLoading());
  }
}; */

const actions = { ...slice.actions };
export {
  actions,
  useChannelAddAsync,
  useChannelRenameAsync,
  useChannelRemoveAsync,
};
export default slice.reducer;
