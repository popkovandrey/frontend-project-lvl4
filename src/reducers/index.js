import { combineReducers } from 'redux';
import appSlice from '../features/app/appSlice';
import channelsSlice from '../features/channels/channelsSlice';
import messagesSlice from '../features/messages/messagesSlice';

export default combineReducers({
  app: appSlice.reducer,
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
});
