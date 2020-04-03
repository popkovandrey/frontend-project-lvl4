import React, { useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';
import Spinner from '../Spinner';

const AddChannel = (props) => {
  const {
    modalName,
    hideModal,
    processing,
  } = props;

  const { t } = useTranslation();
  const { channelAddAsync } = asyncActions.useChannelAddAsync();

  const handleHideModal = () => hideModal();

  const handleSubmit = (formValues, formActions) => {
    const { newChannelName } = formValues;

    if (newChannelName.trim() === '') {
      /* eslint-disable no-param-reassign */
      formValues.newChannelName = '';
      return;
    }

    const { resetForm } = formActions;

    const callbackFinishAddChannel = () => {
      resetForm();
      hideModal();
    };

    channelAddAsync(
      { name: newChannelName },
      callbackFinishAddChannel,
    );
  };

  const input = useRef(null);
  useEffect(() => input?.current?.focus());

  return (
    <Modal show={modalName === 'addChannel'} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelAddTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik initialValues={{ newChannelName: '' }} onSubmit={handleSubmit}>
          {() => (
            <Form className="form-inline w-100 justify-content-between">
              <Field
                name="newChannelName"
                type="text"
                placeholder={t('modals.placeholderAddChannel')}
                disabled={processing}
                className="form-control flex-grow-1 mx-1 my-1"
                innerRef={input}
              />
              <Button
                type="submit"
                variant="info"
                className="col-sm-auto mx-1 my-1"
                disabled={processing}
              >
                {processing ? <Spinner /> : t('modals.btnOk')}
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
  processing: state.channels.processing,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannel);
