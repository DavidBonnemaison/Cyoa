import React from 'react';
import { connect } from 'react-redux';
import { withReduxSaga } from './../../store';
import Story from './../Story/index';
import { switchMode } from './actions';

const editMode = () => <Story mode="edit" />;
const viewMode = () => <Story mode="view" />;
const mixedMode = () => (
  <div>
    <Story mode="edit" />
    <Story mode="view" />
  </div>
);

const getMode = mode => {
  switch (mode) {
    case 'edit':
      return editMode();
    case 'view':
      return viewMode();
    case 'mixed':
      return mixedMode();
    default:
      return editMode();
  }
};

class Mode extends React.Component {
  constructor(props) {
    super(props);
    this.switchButtons = ['edit', 'view', 'mixed'].map(mode => (
      <button key={mode} id={mode} onClick={this._switchMode}>
        {mode}
      </button>
    ));
  }

  _switchMode = ({ target }) => {
    this.props.dispatch(switchMode(target.id));
  };

  render() {
    return (
      <div>
        {this.switchButtons}
        {getMode(this.props.mode)}
      </div>
    );
  }
}

export default withReduxSaga(connect(state => state.mode)(Mode));
