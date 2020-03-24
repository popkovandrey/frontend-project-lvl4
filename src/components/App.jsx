import React from 'react';
import NavBar from './NavBar';
import AddMessageForm from './AddMessageForm';
import Header from './Header';
import Messages from './Messages';

const App = () => (
  <div className="d-flex flex-column flex-md-row h-100">
    <NavBar />
    <div className="d-flex flex-column flex-grow-1 w-100">
      <Header />
      <Messages />
      <AddMessageForm />
    </div>
  </div>
);

export default App;
