import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { asyncActions } from '../slices';
import UserNameContext from '../UserNameContext';
import Spinner from './Spinner';

const AddMessageForm = () => {
  const { t } = useTranslation();
  const { userName } = useContext(UserNameContext);

  const { addMessage } = asyncActions.useAddMessage();

  const handleSubmit = async (formValues, formActions) => {
    const { text } = formValues;
    const { setSubmitting, resetForm } = formActions;

    if (!text.trim()) {
      return;
    }

    await addMessage({ text, author: userName });

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

export default AddMessageForm;
