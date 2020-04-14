import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation, Trans } from 'react-i18next';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';
import { getCurrentChannel } from '../../selectors';
import Spinner from '../Spinner';

const RemoveChannel = (props) => {
  const {
    modalName,
    hideModal,
    currentChannel,
  } = props;

  const { t } = useTranslation();
  const { removeChannel } = asyncActions.useRemoveChannel();

  const handleHideModal = () => hideModal();

  const handleSubmit = async () => {
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
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Button
                variant="primary"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner /> : t('modals.btnOk')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.app.modalName,
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveChannel);
