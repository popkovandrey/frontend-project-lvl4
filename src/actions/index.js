import appSlice from '../features/app/appSlice';
import channelsSlice from '../features/channels/channelsSlice';
import messagesSlice from '../features/messages/messagesSlice';

export default (
  {
    ...appSlice.actions,
    ...channelsSlice.actions,
    ...messagesSlice.actions,
  }
);
