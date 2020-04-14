import { combineReducers } from 'redux';
import app, { actions as appActions } from './appSlice';
import
channels,
{
  actions as channelsActions,
  useAddChannel,
  useRenameChannel,
  useRemoveChannel,
} from './channelsSlice';
import messages, { actions as messagesActions, useAddMessage } from './messagesSlice';

export default combineReducers({
  app,
  channels,
  messages,
});

const actions = {
  ...appActions,
  ...channelsActions,
  ...messagesActions,
};

const asyncActions = {
  useAddChannel,
  useRenameChannel,
  useRemoveChannel,
  useAddMessage,
};

export { actions, asyncActions };
