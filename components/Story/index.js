import React from 'react';
import { connect } from 'react-redux';
import Step from './../Step/index';

class Story extends React.Component {
  render() {
    const { steps, name, mode } = this.props;
    return steps ? (
      <div>
        Story name: {name} ({mode})
        {steps.map(step => {
          return <Step key={step.id} {...step} mode={mode} />;
        })}
      </div>
    ) : (
      <div>Story loading...</div>
    );
  }
}

export default connect(state => state.story)(Story);
