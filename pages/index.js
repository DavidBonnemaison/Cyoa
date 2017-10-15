import React from 'react';
import { withReduxSaga } from './../store';
import { loadData } from '../components/Story/actions';
import Mode from './../components/Mode/index';

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
        <Mode />
      </div>
    );
  }
}

export default withReduxSaga(App);
