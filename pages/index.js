import React from 'react';
import { withReduxSaga } from './../store';
import Story from './../components/Story';
import { loadData } from '../actions';

class App extends React.Component {
  static getInitialProps({ store }) {
    if (!store.getState().placeholderData) {
      store.dispatch(loadData());
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadData());
  }
  render() {
    return (
      <div>
        Choose your own adventure !
        <Story />
      </div>
    );
  }
}

export default withReduxSaga(App);
