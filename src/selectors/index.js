import { createSelector } from 'reselect';
import { countBy } from 'lodash';

const getMessagesById = (state) => state.messages.byId;
const getMessagesAllIds = (state) => state.messages.allIds;
const getChannelsById = (state) => state.channels.byId;
const getChannelsAllIds = (state) => state.channels.allIds;
const getId = (id) => id;

export const getCurrentChannelId = (state) => state.app.currentChannelId;

export const getModalName = (state) => state.app.modalName;

export const getChannels = createSelector(
  [getChannelsAllIds, getChannelsById],
  (allIds, byId) => allIds.map((id) => byId[id]),
);

export const getChannel = createSelector(
  [getChannelsById, getId],
  (byId, id) => byId[id],
);

export const getMessages = createSelector(
  [getMessagesAllIds, getMessagesById],
  (allIds, byId) => allIds.map((id) => byId[id]),
);

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

export const getCurrentChannel = createSelector(
  [getCurrentChannelId, getChannelsById],
  (currentChannelId, channelsById) => channelsById[currentChannelId] || {},
);

export const getCountMessagesCurrentChannel = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  ).length,
);

export const getCountsMessages = createSelector(
  getMessagesById,
  (byId) => countBy(byId, (item) => item.channelId),
);
