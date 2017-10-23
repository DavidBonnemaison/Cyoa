import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editName, addStep } from './actions';
import Step from './../Step/index';
import AddStep from './AddStep';

class Story extends React.Component {
  _onChange = ({ target }) => {
    this.props.editName({
      value: target.innerHTML
    });
  };

  render() {
    const { steps, name, storyMode } = this.props;
    const editable = storyMode === 'edit';
    return (
      <div className="Story">
        <style jsx>{`
          .Story {
            flex: 1 0 0;
            height: auto;
            padding: 1em;
            position: relative;
          }

          .Story:nth-child(2n + 1) {
            border-right: 3px solid black;
          }
        `}</style>
        {steps ? (
          <div>
            <h1
              contentEditable={editable}
              dangerouslySetInnerHTML={{ __html: name }}
              style={{
                border: editable ? '1px dashed orange' : '1px solid transparent'
              }}
              onBlur={this._onChange}
            />
            {steps.map(step => {
              return <Step key={step.id} step={step} storyMode={storyMode} steps={steps} />;
            })}
            {editable && <AddStep onClick={this.props.addStep} />}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default connect(
  state => state.story,
  dispatch => bindActionCreators({ editName, addStep }, dispatch)
)(Story);
