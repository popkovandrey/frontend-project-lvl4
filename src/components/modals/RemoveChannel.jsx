import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import actions from '../../actions';
import { getCurrentChannel } from '../../selectors';

const RemoveChannel = (props) => {
  const {
    modalName,
    t,
    removeChannel,
    hideModal,
    isLoading,
    currentChannel,
  } = props;

  const handleHideModal = () => hideModal();

  const handleRemoveChannel = async () => {
    await removeChannel(currentChannel);
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
          variant="secondary"
          disabled={isLoading}
          onClick={handleHideModal}
        >
          {t('modals.btnCancel')}
        </Button>
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={handleRemoveChannel}
        >
          {t('modals.btnOk')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.app.modalName,
  isLoading: state.app.isLoading,
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
  removeChannel: (channel) => dispatch(actions.channelRemoveAsync(channel)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RemoveChannel));
