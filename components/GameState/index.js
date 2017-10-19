import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateStateItem } from './actions';

class GameState extends React.Component {
  _updateStateItem = ({ target: { id, value } }) => {
    this.props.updateStateItem({ id, value });
  };

  render() {
    const { gameState } = this.props;
    const statItems = Object.keys(gameState);
    const statsToDisplay = statItems.map(
      statItem => gameState[statItem].current || gameState[statItem]
    );
    return (
      <div className="StatusBar">
        <style jsx>{`
          .StatusBar {
            position: sticky;
            top: 3em;
            background: #666;
            color: white;
            z-index: 5;
            margin-top: -0.5em;
            padding: 0.2em;
          }

          .StatusBar-item {
            display: inline-block;
            margin: 0 0.2em;
          }

          .StatusBar-item input {
            width: 3em;
          }
        `}</style>
        {statItems.map((stateItem, i) => (
          <div className="StatusBar-item" key={`stateItem-${i}`}>
            {stateItem} :{' '}
            <input
              value={statsToDisplay[i]}
              id={stateItem}
              onChange={this._updateStateItem}
            />
            {i !== statItems.length - 1 && ' --- '}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ updateStateItem }, dispatch)
)(GameState);
