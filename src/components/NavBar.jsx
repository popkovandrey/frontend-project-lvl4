import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';
// import Avatar from 'react-avatar';
import UserNameContext from '../UserNameContext';
import actions from '../actions';
import { getChannels, getCountsMessages, getCurrentChannelId } from '../selectors';

const handleSelectChannel = (props) => (event) => {
  event.preventDefault();
  const { dispatch, id } = props;
  dispatch(actions.setCurrentChannelId({ id }));
};

const renderChannel = (props) => {
  const {
    id,
    name,
    currentChannelId,
    countsMessages,
  } = props;

  const isActive = id === currentChannelId;

  return (
    <Nav.Item key={id} className="ml-2">
      <Nav.Link active={isActive} onClick={handleSelectChannel(props)}>
        {`# ${name} [кол-во: ${countsMessages[id] || 0}]`}
      </Nav.Link>
    </Nav.Item>
  );
};

const NavBar = (props) => {
  const { channels } = props;
  const dispatch = useDispatch();
  const { userName } = useContext(UserNameContext);
  return (
    <Navbar bg="dark" variant="dark" className="col-md-2 flex-md-column" expand="md" style={{ minWidth: 'fit-content' }}>
      <Navbar.Brand>Чат (Slack)</Navbar.Brand>
      <div className="my-2 ml-1 text-light align-self-start">
        Пользователь: {userName}
      </div>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar" className="flex-column justify-content-between w-100 mh-100 overflow-auto align-items-start mt-4">
        <div className="w-100 h-100 pr-1 overflow-auto">
          <Nav className="flex-column">
            {channels.map((channel) => renderChannel({ ...props, ...channel, dispatch }))}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => (
  {
    channels: getChannels(state),
    countsMessages: getCountsMessages(state),
    currentChannelId: getCurrentChannelId(state),
  }
);

export default connect(mapStateToProps)(NavBar);
