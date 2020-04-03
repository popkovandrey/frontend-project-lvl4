import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import faker from 'faker';
import cookie from 'js-cookie';
import io from 'socket.io-client';
import App from './components/App';
import UserNameContext from './UserNameContext';
import rootReducer, { actions } from './slices';
import normolizeData from './utils/normolizeData';

const cookieUserName = 'userName';

export default (dataGon) => {
  const userName = cookie.get(cookieUserName) || faker.name.findName();

  cookie.set(cookieUserName, userName);

  const socket = io();

  const { channels, messages, currentChannelId } = dataGon;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels: normolizeData(channels),
      messages: { messages, processingSendMessage: false },
      app: { currentChannelId },
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

  socket.on('newMessage', ({ data }) => store.dispatch(actions.messageFetchSuccess(data)));

  socket.on('newChannel', ({ data }) => store.dispatch(actions.channelAddFetchSuccess(data)));

  socket.on('renameChannel', ({ data }) => store.dispatch(actions.channelRenameFetchSuccess(data)));

  socket.on('removeChannel', ({ data }) => store.dispatch(actions.channelRemoveFetchSuccess(data)));

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={{ userName }}>
      <ToastProvider>
        <App />
      </ToastProvider>
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
