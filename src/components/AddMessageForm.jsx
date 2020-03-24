import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import actions from '../actions';
import UserNameContext from '../UserNameContext';
import Spinner from './Spinner';

const AddMessageForm = (props) => {
  const { t } = props;
  const dispatch = useDispatch();
  const { userName } = useContext(UserNameContext);
  const { addToast } = useToasts();

  const handleSubmit = async (formValues, formActions) => {
    const { text } = formValues;
    const { setSubmitting, resetForm } = formActions;

    if (!text.trim()) {
      return;
    }

    try {
      await dispatch(actions.messageAddAsync({ text, author: userName }));
    } catch (err) {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      throw (err);
    }

    setSubmitting(false);

    resetForm();
  };

  return (
    <div className="mt-auto">
      <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="d-flex">
            <Field
              name="text"
              disabled={isSubmitting}
              className="flex-grow-1 mx-1"
              placeholder={t('modals.placeholderAddMessage')}
            />
            {isSubmitting ? <Spinner /> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withTranslation()(AddMessageForm);
