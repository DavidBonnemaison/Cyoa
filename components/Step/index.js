import React from 'react';

class Step extends React.Component {
  render() {
    const { id, text, to } = this.props;
    return <div>{text}</div>;
  }
}

export default Step;
