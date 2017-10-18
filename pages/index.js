import React from 'react';
import { connect } from 'react-redux';
import { withReduxSaga } from './../store';
import Mode from './../components/Mode/index';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (document) {
      function addStylesheet(href) {
        const head = document.head,
          link = document.createElement('link');

        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;

        head.appendChild(link);
      }

      addStylesheet(
        'https://unpkg.com/react-selectize@3.0.1/dist/index.min.css'
      );
      addStylesheet('/static/css/font-awesome.css');
    }
  }

  render() {
    const { loaded } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <style global jsx>{`
          html,
          body {
            height: calc(100% - 1.7em);
            margin: 0;
          }
          body {
            font-family: sans-serif;
            padding-top: 3.4em;
          }
          .react-selectize.default {
            width: 100% !important;
          }
          .react-selectize.root-node
            .react-selectize-control
            .react-selectize-search-field-and-selected-values
            .value-wrapper {
            width: 90%;
            text-align: center;
            display: block !important;
          }
          .multi-select.react-selectize.default.root-node .simple-value {
            display: block;
          }
        `}</style>
        <Mode />
      </div>
    );
  }
}

export default withReduxSaga(connect(state => state.story)(App));
