import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import actions from '../actions';
import UserNameContext from '../UserNameContext';

const AddMessageForm = () => {
  const dispatch = useDispatch();
  const { userName } = useContext(UserNameContext);

  const onSubmit = async (formValues, formActions) => {
    const { text } = formValues;
    const { setSubmitting, resetForm } = formActions;

    if (!text.trim()) {
      return;
    }

    await dispatch(actions.addMessageAsync({ text, author: userName }));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={onSubmit}>
      {() => (
        <Form className="position-relative d-flex shadow-lg p-2">
          <Field name="text">

          </Field>
          <Button
            type="submit"
            className="align-self-end px-2 py-1 ml-1 btn-info"
          >
            Add Message
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default connect()(AddMessageForm);
