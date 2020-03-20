import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserNameContext from '../UserNameContext';
import actions from '../actions';
import {
  getChannels,
  getCountsMessages,
  getCurrentChannelId,
  getModalName,
} from '../selectors';
import getModalWindow from './modals';

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
    <Nav.Item key={id} className="ml-3">
      <Nav.Link active={isActive} onClick={handleSelectChannel(props)}>
        {`# ${name} [кол-во: ${countsMessages[id] || 0}]`}
      </Nav.Link>
    </Nav.Item>
  );
};

const renderModalWindow = (modalInfo) => {
  if (!modalInfo.name || modalInfo.name === 'none') {
    return null;
  }

  const ModalWindow = getModalWindow(modalInfo.name);
  return <ModalWindow />;
};

const NavBar = (props) => {
  const { channels, modalName } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userName } = useContext(UserNameContext);
  return (
    <Navbar bg="dark" variant="dark" className="col-md-2 flex-md-column" expand="md" style={{ minWidth: 'fit-content' }}>
      <Navbar.Brand>{t('brandName')}</Navbar.Brand>
      <div className="my-2 ml-1 text-light align-self-start">
        {t('prefixUser') + userName}
      </div>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar" className="flex-column justify-content-between w-100 mh-100 overflow-auto align-items-start mt-4">
        <div className="w-100 h-100 pr-1 overflow-auto">
          <Button
            variant="outline-secondary"
            size="sm"
            className="text-light text-decoration-none w-100 px-2 py-0 mb-2 d-flex justify-content-between align-items-center"
            onClick={() => dispatch(actions.showModal({ modalName: 'addChannel' }))}
          >
            <span className="lead">{t('addChannelsBtnCaption')}</span>
            <strong className="mr-1">+</strong>
          </Button>
          <Nav className="flex-column">
            {channels.map((channel) => renderChannel({ ...props, ...channel, dispatch }))}
          </Nav>
        </div>
      </Navbar.Collapse>
      {renderModalWindow({ name: modalName })}
    </Navbar>
  );
};

const mapStateToProps = (state) => (
  {
    channels: getChannels(state),
    countsMessages: getCountsMessages(state),
    currentChannelId: getCurrentChannelId(state),
    modalName: getModalName(state),
  }
);

export default connect(mapStateToProps)(NavBar);
