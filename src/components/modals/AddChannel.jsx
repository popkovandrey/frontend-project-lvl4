import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import actions from '../../actions';

const AddChannel = (props) => {
  const {
    modalName,
    t,
    addChannel,
    hideModal,
  } = props;

  const handleHideModal = () => hideModal();

  const handleSubmit = async (formValues, formActions) => {
    const { newChannelName } = formValues;
    const { setSubmitting, resetForm } = formActions;
    await addChannel({ name: newChannelName });
    setSubmitting(false);
    resetForm();
    hideModal();
  };

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
              />
              <Button
                type="submit"
                variant="info"
                className="col-sm-auto mx-1 my-1"
                disabled={isSubmitting}
              >
                {t('modals.btnOk')}
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
  // isLoading: state.app.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
  addChannel: (channel) => dispatch(actions.channelAddAsync(channel)),
});

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(AddChannel));
