import React from 'react';
import Editable from './Editable';

class Step extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    return (
      <div>
        <Editable {...props} elm="h2" selector="title" />
        <Editable {...props} elm="p" selector="text" />
      </div>
    );
  }
}

export default Step;
