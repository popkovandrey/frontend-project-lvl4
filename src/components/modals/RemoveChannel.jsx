import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';
import { getCurrentChannel } from '../../selectors';
import Spinner from '../Spinner';

const RemoveChannel = (props) => {
  const {
    modalName,
    hideModal,
    currentChannel,
    processing,
  } = props;

  const { t } = useTranslation();
  const { channelRemoveAsync } = asyncActions.useChannelRemoveAsync();

  const handleHideModal = () => hideModal();

  const handleRemoveChannel = () => {
    channelRemoveAsync(currentChannel, hideModal);

    // hideModal();
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
          disabled={processing}
          onClick={handleRemoveChannel}
        >
          {processing ? <Spinner /> : t('modals.btnOk')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.app.modalName,
  currentChannel: getCurrentChannel(state),
  processing: state.channels.processing,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveChannel);
