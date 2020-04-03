import { combineReducers } from 'redux';

import app, { actions as appActions } from './appSlice';
import
channels,
{
  actions as channelsActions,
  useChannelAddAsync,
  useChannelRenameAsync,
  useChannelRemoveAsync,
} from './channelsSlice';
import messages, { actions as messagesActions, useMessageAddAsync } from './messagesSlice';

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
  useChannelAddAsync,
  useChannelRenameAsync,
  useChannelRemoveAsync,
  useMessageAddAsync,
};

export { actions, asyncActions };
