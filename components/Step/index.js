import React from 'react';
import { Element, Link } from 'react-scroll';
import { MultiSelect } from 'react-selectize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  editToSteps,
  removeStep,
  switchType,
  editStepLabel
} from './../Story/actions';
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

  _editStepLabel = ({ target }) => {
    this.props.editStepLabel({
      id: target.id,
      label: target.value,
      step: target.name
    });
  };

  render() {
    const { props } = this;
    const { steps, step, storyMode } = props;
    const { actions, type, id } = step;
    const { goTo } = actions;
    const places = steps.map(s => ({ label: s.title, value: s.id }));

    const getPlaceName = value =>
      steps.filter(s => s.id === value)[0].title || 'undefined';

    const getPlaceLabel = value => {
      const stepLabel = step.actions.goTo.filter(s => s.step === value)[0]
        .stepLabel;
      return stepLabel || getPlaceName(value);
    };

    return steps ? (
      <Element className="Step" name={`step-${id}`}>
        <style global jsx>
          {`
            .Step {
              border-top: 1px solid black;
              padding: 3em 0;
              position: relative;
              min-height: 24em;
            }

            textarea {
              background: white;
              width: 100%;
              margin: 0.5em 0;
              padding: 0.2em;
            }

            textarea.h2 {
              font-size: 2em;
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
            .StepLabel {
              width: 100%;
              padding: 0.2em;
              margin: 0.2em;
              box-sizing: border-box;
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
                label: getPlaceName(step),
                value: step
              }))}
              onValuesChange={this._editToStep}
            />
            {goTo.map(({ step: localStep, stepLabel }) => (
              <input
                key={`${localStep}-${stepLabel}`}
                type="text"
                id={step.id}
                defaultValue={stepLabel}
                name={localStep}
                onBlur={this._editStepLabel}
                className="StepLabel"
              />
            ))}
          </div>
        )}
      </Element>
    ) : null;
  }
}

export default connect(
  state => state,
  dispatch =>
    bindActionCreators(
      { editToSteps, removeStep, switchType, editStepLabel },
      dispatch
    )
)(Step);
