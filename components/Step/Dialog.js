import React from 'react';
import { SimpleSelect } from 'react-selectize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editable from './Editable';
import { editCharacter } from './../Story/actions';

class Dialog extends React.Component {
  _editCharacter = ({ value }) => {
    this.props.editCharacter({ value, id: this.props.id });
  };

  render() {
    const { props } = this;
    const { storyMode, step, story = {} } = props;
    const { characters = [] } = story;
    const { character = 0 } = step;
    const getCharacterNameById = id =>
      characters.filter(c => c.id === id)[0].name;
    const characterOptions = characters.map(c => ({
      label: c.name,
      value: c.id
    }));
    const getCharacterFace = id =>
      characters.filter(c => c.id === id)[0].avatar;
    return (
      <div>
        <style jsx>{`
          .Avatar {
            font-size: 1.2em;
            height: 1.85em;
          }

          .Avatar img {
            max-width: 2em
          }
        `}</style>
        <Editable {...step} elm="h2" selector="title" storyMode={storyMode} />
        {storyMode === 'view' ? (
          <div className="Avatar">
            {character !== 0 &&
            getCharacterFace(character) && (
              <img src={getCharacterFace(character)} />
            )}
            {character !== 0 && getCharacterNameById(character)}
          </div>
        ) : (
          <SimpleSelect
            key={Math.random()}
            placeholder="Select character"
            options={characterOptions}
            defaultValue={{
              label: getCharacterNameById(character),
              value: character
            }}
            onValueChange={this._editCharacter}
          />
        )}

        <Editable {...step} elm="p" selector="text" storyMode={storyMode} />
      </div>
    );
  }
}
export default connect(
  state => state,
  dispatch => bindActionCreators({ editCharacter }, dispatch)
)(Dialog);
