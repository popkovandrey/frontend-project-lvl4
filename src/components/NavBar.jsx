import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import UserNameContext from '../UserNameContext';
import { actions } from '../slices';
import {
  getChannels,
  getCountsMessages,
  getCurrentChannelId,
  getModalName,
} from '../selectors';
import getModalWindow from './modals';

const renderChannel = (props) => {
  const {
    id,
    name,
    removable,
    currentChannelId,
    countsMessages,
    dispatch,
  } = props;

  const isActive = id === currentChannelId;
  const isVisibleIcon = isActive && removable;

  const handleSelectChannel = (event) => {
    event.preventDefault();
    dispatch(actions.setCurrentChannelId({ id }));
  };

  const handleClickRenameChannel = (event) => {
    event.preventDefault();
    dispatch(actions.showModal({ modalName: 'renameChannel' }));
  };

  const handleClickRemoveChannel = (event) => {
    event.preventDefault();
    dispatch(actions.showModal({ modalName: 'removeChannel' }));
  };

  return (
    <Nav.Item key={id} className="ml-3">
      <Nav.Link active={isActive} onClick={handleSelectChannel}>
        <div className="d-flex justify-content-between">
          {`# ${name}`}
          <div className="d-flex justify-content-end">
            {isVisibleIcon && <FontAwesomeIcon
              icon={faEdit}
              onClick={handleClickRenameChannel}
              className="mr-2"
            />}
            {isVisibleIcon && <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={handleClickRemoveChannel}
              className="mr-2"
            />}
            <small>{countsMessages[id] || 0}</small>
          </div>
        </div>
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

const NavBar = () => {
  const channels = useSelector((state) => getChannels(state));
  const countsMessages = useSelector((state) => getCountsMessages(state));
  const currentChannelId = useSelector((state) => getCurrentChannelId(state));
  const modalName = useSelector((state) => getModalName(state));
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
            {channels.map((channel) => renderChannel({
              ...channel, countsMessages, currentChannelId, dispatch,
            }))}
          </Nav>
        </div>
      </Navbar.Collapse>
      {renderModalWindow({ name: modalName })}
    </Navbar>
  );
};

export default NavBar;
