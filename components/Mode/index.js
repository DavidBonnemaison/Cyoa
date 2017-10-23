import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Story from './../Story/index';
import { switchMode } from './actions';
import SplashScreen from '../Story/StoryLoader';

const editMode = () => <Story storyMode="edit" />;
const viewMode = () => <Story storyMode="view" />;
const mixedMode = () => (
  <div className="Mixed">
    <style global jsx>{`
      .Mixed {
        display: flex;
        flex-direction: row;
      }
    `}</style>
    <Story storyMode="edit" />
    <Story storyMode="view" />
  </div>
);

const getMode = ({ mode }) => {
  switch (mode) {
    case 'edit':
      return editMode();
    case 'view':
      return viewMode();
    case 'mixed':
      return mixedMode();
    default:
      return mixedMode();
  }
};

class Mode extends React.Component {
  constructor(props) {
    super(props);
    const buttons = [
      {
        mode: 'edit',
        text: 'Edit',
        icon: 'fa-pencil'
      },
      {
        mode: 'view',
        text: 'View',
        icon: 'fa-eye'
      },
      {
        mode: 'mixed',
        text: 'Mixed',
        icon: 'fa-balance-scale'
      }
    ];
    this.switchButtons = buttons.map(({ mode, text, icon }) => (
      <button className="Label" key={mode} id={mode} onClick={this._switchMode}>
        <i className={`fa ${icon}`} aria-hidden="true" />
        {text}
      </button>
    ));
  }

  _switchMode = ({ target }) => {
    this.props.switchMode(target.id);
  };

  render() {
    const { mode, story } = this.props;
    return (
      <div>
        <style jsx global>{`
          .Label {
            color: #555;
            cursor: pointer;
            background: #e2e2e2;
            padding: 0.5em;
            margin: 0.5em;
            border-radius: 3px;
            box-shadow: none;
            border: none;
            font-size: 1em;
          }

          .Label > i {
            margin-right: 0.5em;
          }
        `}</style>
        <div className="Bar">
          {story.loaded && this.switchButtons}
          <SplashScreen />
        </div>
        <style jsx>{`
          .Bar {
            position: fixed;
            padding: 0;
            top: 0;
            left: 0;
            right: 0;
            height: auto;
            background: #333;
            z-index: 2;
          }
        `}</style>
        {story.loaded ? (
          getMode(mode)
        ) : (
          <div style={{ textAlign: 'center', padding: '2em' }}>
            Please choose a JSON story file.
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ switchMode }, dispatch)
)(Mode);
