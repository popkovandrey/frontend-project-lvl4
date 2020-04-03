import { createSelector } from 'reselect';
import { countBy } from 'lodash';

const getMessages = (state) => state.messages.messages;
const getChannelsById = (state) => state.channels.byId;
// const getId = (id) => id;

export const getCurrentChannelId = (state) => state.app.currentChannelId;

export const getModalName = (state) => state.app.modalName;

export const getChannels = createSelector(
  getChannelsById,
  (byId) => Object.values(byId),
);

/* export const getChannel = createSelector(
  [getChannels, getId],
  (channels, _id) => channels
    .filter(({ id }) => id === _id),
); */

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const getCurrentChannel = createSelector(
  [getCurrentChannelId, getChannelsById],
  (currentChannelId, byId) => byId[currentChannelId],
);

export const getCountMessagesCurrentChannel = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  ).length,
);

export const getCountsMessages = createSelector(
  getMessages,
  (messages) => countBy(messages, (item) => item.channelId),
);
