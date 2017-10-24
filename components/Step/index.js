import React from 'react';
import { Element, Link } from 'react-scroll';
import { MultiSelect } from 'react-selectize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editToSteps, removeStep, switchType } from './../Story/actions';
import Dialog from './Dialog';
import Place from './Place';

class Step extends React.Component {
  constructor(props) {
    super(props);
  }

  _editToStep = options => {
    const { editToSteps, step } = this.props;
    const { id } = step;
    const to = options.map(o => o.value);
    editToSteps({ id, to });
  };

  _removeStep = ({ target }) => {
    this.props.removeStep({
      id: Number(target.id)
    });
  };

  _switchType = ({ target }) => {
    this.props.switchType({ id: target.id, from: target.innerHTML });
  };

  render() {
    const { props } = this;
    const { steps, step, storyMode } = props;
    const { actions, type, id } = step;
    const { goTo } = actions;
    const places = steps.map(s => ({ label: s.title, value: s.id }));
    const getPlaceLabel = value =>
      steps.filter(s => s.id === value)[0]
        ? steps.filter(s => s.id === value)[0].title
        : 'undefined';

    return steps ? (
      <Element className="Step" name={`step-${id}`}>
        <style global jsx>
          {`
            .Step {
              border-top: 1px solid black;
              padding: 3em 0;
              position: relative;
            }
          `}
        </style>
        <style jsx>
          {`
            .GoToButtons {
              border: 1px solid;
              border-color: #d9d9d9 #ccc #b3b3b3;
              border-radius: 4px;
              padding: 3px 25px 1.5px 20px;
            }
            button {
              background: #f2f9fc;
              border: 1px solid #c9e6f2;
              border-radius: 2px;
              color: #08c;
              padding: 2px 4px 4px;
              margin: 2px;
              font-size: 1em;
              width: 100%;
            }
            .RemoveStep {
              position: absolute;
              top: 0;
              right: 0;
              cursor: pointer;
              color: red;
              font-size: 2em;
            }
            .StepType {
              position: absolute;
              top: 0;
              left: 0;
              background-color: ${type === 'place' ? '#1fa01b' : '#0874b8'};
              color: white;
              font-size: 0.8em;
              padding: 0.5em;
              cursor: pointer;
            }
          `}
        </style>
        {type === 'place' ? (
          <Place step={step} storyMode={storyMode} />
        ) : (
          <Dialog storyMode={storyMode} id={id} step={step} />
        )}
        {storyMode === 'view' ? (
          <div className="GoToButtons">
            {goTo.filter(t => t !== null).map(({ step }) => (
              <Link to={`step-${step}`} key={step} smooth={true} duration={200}>
                <button>{getPlaceLabel(step)}</button>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <div className="RemoveStep" onClick={this._removeStep} id={step.id}>
              ×
            </div>
            <div className="StepType" onClick={this._switchType} id={step.id}>
              {type}
            </div>
            <MultiSelect
              key={Math.random()}
              placeholder="Select next steps"
              options={places}
              defaultValues={goTo.filter(t => t !== null).map(({ step }) => ({
                label: getPlaceLabel(step),
                value: step
              }))}
              onValuesChange={this._editToStep}
            />
          </div>
        )}
      </Element>
    ) : null;
  }
}

export default connect(
  state => state,
  dispatch =>
    bindActionCreators({ editToSteps, removeStep, switchType }, dispatch)
)(Step);
