import React from 'react';
import { withReduxSaga } from './../../store';
import { editField } from './../Story/actions';

class Editable extends React.Component {
  constructor(props) {
    super(props);
  }

  _onChange = ({ target }) => {
    const { dispatch, selector, id } = this.props;
    dispatch(
      editField({
        id,
        field: selector,
        value: target.value
      })
    );
  };

  render() {
    const { props } = this;
    const { elm, selector, mode } = props;
    const Elm = mode === 'view' ? elm : 'textarea';
    return (
      <Elm onChange={this._onChange} value={props[selector]}>
        {props[selector]}
      </Elm>
    );
  }
}

export default withReduxSaga(Editable);
