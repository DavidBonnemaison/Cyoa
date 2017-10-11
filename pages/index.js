import React from 'react';
import 'whatwg-fetch';
import Story from './../components/Story';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    };
  }

  componentDidMount() {
    fetch('/static/story.json')
      .then(res => res.json())
      .then(story =>
        this.setState({
          story
        })
      );
  }
  render() {
    const { story } = this.state;
    return (
      <div>
        Choose your own adventure !
        {story ? <Story story={story} /> : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
