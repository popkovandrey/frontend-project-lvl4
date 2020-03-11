import React from 'react';

export default class App extends React.Component {
  render() {
    const { data } = this.props;
    console.log('data', data);
    return (
      <ul>
        {data.channels.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    );
  }
}
