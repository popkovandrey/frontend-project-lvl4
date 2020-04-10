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
  } = props;

  const { t } = useTranslation();
  const { channelAddAsync } = asyncActions.useChannelAddAsync();

  const handleHideModal = () => hideModal();

  const handleSubmit = async (formValues, formActions) => {
    const { newChannelName } = formValues;

    if (newChannelName.trim() === '') {
      /* eslint-disable no-param-reassign */
      formValues.newChannelName = '';
      return;
    }

    const { resetForm, setSubmitting } = formActions;

    await channelAddAsync({ name: newChannelName });

    setSubmitting(false);
    resetForm();
    hideModal();
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
          {({ isSubmitting }) => (
            <Form className="form-inline w-100 justify-content-between">
              <Field
                name="newChannelName"
                type="text"
                placeholder={t('modals.placeholderAddChannel')}
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
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannel);
