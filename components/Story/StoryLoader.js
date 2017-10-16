import React from 'react';
import { connect } from 'react-redux';
import { withReduxSaga } from '../../store';
import { decode } from 'base-64';
import { uploadData } from './actions';

class StoryLoader extends React.Component {
  _getStoryFile = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = upload => {
      this.props.dispatch(
        uploadData({
          data: decode(upload.target.result.replace('data:;base64,', '')),
          name: file.name
        })
      );
    };

    reader.readAsDataURL(file);
  };

  _saveStoryFile = () => {
    const b = new Blob([JSON.stringify(this.props)], {
      type: 'application/json'
    });
    console.log(b);

    const saveByteArray = (() => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      return (data, name) => {
        const blob = new Blob(data, { type: 'octet/stream' }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    })();

    saveByteArray(
      [JSON.stringify({ ...this.props, loaded: undefined })],
      `${this.props.name}.json`
    );
  };

  render() {
    const { loaded } = this.props;
    return (
      <div style={{ display: 'inline-block', padding: loaded ? 0 : '1em' }}>
        <label className="Label">
          <i className="fa fa-upload" aria-hidden="true" />
          Load
          <input
            type="file"
            onChange={this._getStoryFile}
            style={{ display: 'none' }}
          />
        </label>
        {' '}
        {loaded && (
          <button className="Label" onClick={this._saveStoryFile}>
            <i className="fa fa-save" aria-hidden="true" />
            Save
          </button>
        )}
      </div>
    );
  }
}

export default withReduxSaga(connect(state => state.story)(StoryLoader));
