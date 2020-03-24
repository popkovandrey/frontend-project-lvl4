/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { pull } from 'lodash';
import routes from '../../routes';
import app, { defaultChannelId } from '../app/appSlice';

const { startLoading, finishLoading, setCurrentChannelId } = app.actions;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    channelAdd: (state, action) => {
      const { id, attributes: channel } = action.payload;
      state.byId[id] = channel;
      state.allIds.push(id);
    },
    channelRename: (state, action) => {
      const { id, attributes: { name } } = action.payload;
      state.byId[id].name = name;
    },
    channelRemove: (state, action) => {
      const { id } = action.payload;
      delete state.byId[id];
      pull(state.allIds, id);
    },
  },
});

const channelAddAsync = (channel) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const data = { attributes: { ...channel } };
    const { data: { data: { id } } } = await axios.post(routes.channelsPath(), { data });
    dispatch(setCurrentChannelId({ id }));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

const channelRenameAsync = ({ id, name }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const data = { attributes: { name } };
    await axios.patch(routes.channelPath(id), { data });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};

const channelRemoveAsync = ({ id }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(setCurrentChannelId({ id: defaultChannelId }));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    dispatch(finishLoading());
  }
};


export default {
  ...channelsSlice,
  actions: {
    ...channelsSlice.actions,
    channelAddAsync,
    channelRenameAsync,
    channelRemoveAsync,
  },
};
