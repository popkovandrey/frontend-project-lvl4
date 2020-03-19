import React, { useContext } from 'react';
import { connect } from 'react-redux';
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
          <strong className="mr-auto">{author}</strong>
          <small><Trans i18nKey="formatDT">{{ date }}</Trans></small>
        </Toast.Header>
        <Toast.Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      </Toast>
    </div>
  );
};

const Messages = (props) => {
  const { messages } = props;
  const mainClasses = classnames({
    'd-flex flex-column position-relative': true,
    // 'h-100 overflow-auto': true,
  });

  return (
    <main className={mainClasses}>
      {messages.map(({
        text, author, date, id,
      }) => <Message key={id} text={text} author={author} date={date} />)}
    </main>
  );
};

const mapStateToProps = (state) => ({
  messages: getCurrentChannelMessages(state),
});

export default connect(mapStateToProps)(Messages);
