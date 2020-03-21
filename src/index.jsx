import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import faker from 'faker';
import cookie from 'js-cookie';
import io from 'socket.io-client';
import App from './components/App.jsx';
import UserNameContext from './UserNameContext';
import rootReducer from './reducers';
import actions from './actions';
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
      messages: normolizeData(messages),
      app: { currentChannelId },
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

  socket.on('newMessage', ({ data }) => store.dispatch(actions.messageAdd(data)));

  socket.on('newChannel', ({ data }) => store.dispatch(actions.channelAdd(data)));

  socket.on('removeChannel', ({ data }) => store.dispatch(actions.channelRemove(data)));

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={{ userName }}>
        <App />
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('root'),
  );
};
