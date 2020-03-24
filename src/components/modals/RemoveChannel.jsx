import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withTranslation, Trans } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import actions from '../../actions';
import { getCurrentChannel } from '../../selectors';
import Spinner from '../Spinner';

const RemoveChannel = (props) => {
  const {
    modalName,
    t,
    removeChannel,
    hideModal,
    currentChannel,
    isLoading,
  } = props;

  const { addToast } = useToasts();

  const handleHideModal = () => hideModal();

  const handleRemoveChannel = async () => {
    try {
      await removeChannel(currentChannel);
    } catch ({ message }) {
      addToast(message, { appearance: 'error', autoDismiss: true });
    }

    hideModal();
  };

  return (
    <Modal show={modalName === 'removeChannel'} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelRemoveTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Trans i18nKey="modals.confirmChannelRemove">{{ name: currentChannel.name }}</Trans>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={handleRemoveChannel}
        >
          {isLoading ? <Spinner /> : t('modals.btnOk')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.app.modalName,
  currentChannel: getCurrentChannel(state),
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
  removeChannel: (channel) => dispatch(actions.channelRemoveAsync(channel)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RemoveChannel));
