import React from 'react';
import { connect } from 'react-redux';
import { withReduxSaga } from './../../store';
import { editName } from './actions';
import Step from './../Step/index';

class Story extends React.Component {
  _onChange = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(
      editName({
        value: target.innerHTML
      })
    );
  };

  render() {
    const { steps, name, mode } = this.props;
    const stepIds = steps && steps.map(s => s.id);
    const editable = mode === 'edit';
    return (
      <div className="Story">
        <style jsx>{`
          .Story {
            flex: 1 0 0;
            height: auto;
            padding: 1em;
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
              return (
                <Step key={step.id} {...step} mode={mode} stepIds={stepIds} />
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default withReduxSaga(connect(state => state.story)(Story));
