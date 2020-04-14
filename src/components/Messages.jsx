import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import classnames from 'classnames';
import { Trans } from 'react-i18next';
import DOMPurify from 'dompurify';
import { getCurrentChannelMessages } from '../selectors';
import UserNameContext from '../UserNameContext';

const Message = (props) => {
  const { text, author, date } = props;
  const { userName } = useContext(UserNameContext);
  const isCurrentUserMessage = author === userName;
  const messageClasses = classnames({
    'w-75 my-3 mx-5': true,
    'align-self-end': isCurrentUserMessage,
    'align-self-start': !isCurrentUserMessage,
  });
  return (
    <div className={messageClasses}>
      <Toast className="mw-100">
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">{author} bbbb</strong>
          <small><Trans i18nKey="formatDT">{{ date }}</Trans></small>
        </Toast.Header>
        <Toast.Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      </Toast>
    </div>
  );
};

const Messages = () => {
  const messages = useSelector((state) => getCurrentChannelMessages(state));

  return (
    <div className="d-flex flex-column overflow-auto">
      {messages.map(({
        text, author, date, id,
      }) => <Message key={id} text={text} author={author} date={date} />)}
    </div>
  );
};

export default Messages;
