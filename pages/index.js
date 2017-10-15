import React from 'react';
import { withReduxSaga } from './../store';
import Story from './../components/Story/index';
import { loadData } from '../components/Story/actions';

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
