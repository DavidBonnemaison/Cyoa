import React from 'react';
import { connect } from 'react-redux';
import Step from './../Step/index';

class Story extends React.Component {
  render() {
    const { story, mode } = this.props;
    return story ? (
      <div>
        Story name: {story.name} ({mode})
        {story.steps.map(step => {
          return <Step key={step.id} {...step} />;
        })}
      </div>
    ) : (
      <div>Story loading...</div>
    );
  }
}

export default connect(state => state.story)(Story);
