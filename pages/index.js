import React from 'react';
import 'whatwg-fetch';
import withRedux from 'next-redux-wrapper';
import initializeStore from './../redux/store';
import Story from './../components/Story';

class App extends React.Component {

  static getInitialProps({ store }) {
    return { store };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log("this.props", this.props);

    fetch('/static/story.json')
      .then(res => res.json())
      .then(story =>
        dispatch({
          type: 'STORY_FETCHED',
          story
        })
      );
  }
  render() {
    const { story } = this.props;
    return (
      <div>
        Choose your own adventure !
        {story ? <Story story={story} /> : <p>Loading...</p>}
      </div>
    );
  }
}

export default withRedux(initializeStore, state => state)(App);
