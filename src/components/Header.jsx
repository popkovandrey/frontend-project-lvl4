import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getCountMessagesCurrentChannel, getCurrentChannel } from '../selectors';

const Header = (props) => {
  const { currentChannel, countMessages } = props;

  const classes = classnames(
    {
      'bg-light': true,
      'border-bottom': true,
      'd-flex': true,
      'justify-content-between': true,
      'align-items-center': true,
      'py-2': true,
      'px-4': true,
    },
  );

  const { name } = currentChannel;

  return (
    <header className={classes}>
      <span className="lead">{`#${name}`}</span>
      <small className="align-self-end">{`сообщений: ${countMessages}`}</small>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentChannel: getCurrentChannel(state),
  countMessages: getCountMessagesCurrentChannel(state),
});

Header.displayName = 'Header';
export default connect(mapStateToProps)(Header);
