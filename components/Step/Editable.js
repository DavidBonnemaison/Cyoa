import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editField } from './../Story/actions';

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true
    };
  }

  _onChange = ({ target }) => {
    const { editField, selector, id } = this.props;
    editField({
      id,
      field: selector,
      value: target.value || target.innerHTML
    });
    this.setState({
      pristine: true
    });
  };

  _onInput = () => {
    this.setState({
      pristine: false
    });
  };

  render() {
    const { props, state } = this;
    const { elm, selector, storyMode } = props;
    const { pristine } = state;
    const editable = storyMode === 'edit';
    return (
      <textarea
        onChange={this._onChange}
        onBlur={this._onChange}
        disabled={!editable}
        value={props[selector]}
        onInput={this._onInput}
        className={elm}
        rows={elm === 'h2' ? 1 : 8}
        style={{
          border:
            editable && pristine
              ? '1px dashed orange'
              : editable && !pristine
                ? '1px dashed red'
                : '1px solid transparent'
        }}
      />
    );
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ editField }, dispatch)
)(Editable);
