import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import actions from '../../actions';
import { getCurrentChannel } from '../../selectors';
import Spinner from '../Spinner';

const RenameChannel = (props) => {
  const {
    modalName,
    t,
    renameChannel,
    hideModal,
    currentChannel,
  } = props;

  const { addToast } = useToasts();

  const handleHideModal = () => hideModal();

  const handleSubmit = async (formValues, formActions) => {
    const { newChannelName } = formValues;

    if (newChannelName.trim() === '') {
      return;
    }

    const { setSubmitting, resetForm } = formActions;

    try {
      await renameChannel({ ...currentChannel, name: newChannelName });
    } catch ({ message }) {
      addToast(message, { appearance: 'error', autoDismiss: true });
    }

    setSubmitting(false);

    resetForm();

    hideModal();
  };

  const input = useRef(null);
  useEffect(() => input?.current?.focus());

  return (
    <Modal show={modalName === 'renameChannel'} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelRenameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ newChannelName: currentChannel.name }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="form-inline w-100 justify-content-between">
              <Field
                name="newChannelName"
                type="text"
                placeholder={t('modals.placeholderRenameChannel')}
                disabled={isSubmitting}
                className="form-control flex-grow-1 mx-1 my-1"
                innerRef={input}
              />
              <Button
                type="submit"
                variant="info"
                className="col-sm-auto mx-1 my-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : t('modals.btnOk')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.app.modalName,
  currentChannel: getCurrentChannel(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
  renameChannel: (channel) => dispatch(actions.channelRenameAsync(channel)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RenameChannel));
