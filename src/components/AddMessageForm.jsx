import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { asyncActions } from '../slices';
import UserNameContext from '../UserNameContext';
import Spinner from './Spinner';

const mapStateToProps = (state) => ({
  processing: state.messages.processingSendMessage,
});

const AddMessageForm = (props) => {
  const { t } = useTranslation();
  const { userName } = useContext(UserNameContext);
  const { processing } = props;

  const { messageAddAsync } = asyncActions.useMessageAddAsync();

  const handleSubmit = (formValues, formActions) => {
    const { text } = formValues;
    const { /* setSubmitting, */ resetForm } = formActions;

    if (!text.trim()) {
      return;
    }

    messageAddAsync({ text, author: userName });

    // setSubmitting(false);

    resetForm();
  };

  return (
    <div className="mt-auto">
      <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
        {(/* { isSubmitting } */) => (
          <Form className="d-flex">
            <Field
              name="text"
              disabled={processing}
              className="flex-grow-1 mx-1"
              placeholder={t('modals.placeholderAddMessage')}
            />
            {processing ? <Spinner /> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps)(AddMessageForm);
