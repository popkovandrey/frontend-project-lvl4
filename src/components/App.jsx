import React from 'react';
import NavBar from './NavBar.jsx';
import AddMessageForm from './AddMessageForm.jsx';
import Header from './Header.jsx';
import Messages from './Messages.jsx';

const App = () => (
  <div className="vh-100 vw-100">
    <div className="d-flex flex-column flex-md-row h-100">
      <NavBar />
      <div className="d-flex flex-column flex-grow-1 w-100 overflow-auto">
        <Header />
        <Messages />
        <AddMessageForm />
      </div>
    </div>
  </div>
);

export default App;
