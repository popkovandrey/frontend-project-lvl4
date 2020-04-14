import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { getCountMessagesCurrentChannel, getCurrentChannel } from '../selectors';

const Header = () => {
  const currentChannel = useSelector((state) => getCurrentChannel(state));
  const countMessages = useSelector((state) => getCountMessagesCurrentChannel(state));

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
    <div className={classes}>
      <span className="lead">{`#${name}`}</span>
      <small className="align-self-end">{`сообщений: ${countMessages}`}</small>
    </div>
  );
};

export default Header;
