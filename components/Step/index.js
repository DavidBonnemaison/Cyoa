import React from 'react';
import { Element, Link } from 'react-scroll';
import { MultiSelect } from 'react-selectize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editable from './Editable';
import { editToSteps } from './../Story/actions';
import Dialog from './Dialog';

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

  render() {
    const { props } = this;
    const { steps, step, storyMode } = props;
    const { actions, type, id } = step;
    const { goTo } = actions;
    const places = steps.map(s => ({ label: s.title, value: s.id }));
    const getPlaceLabel = value => {
      console.log(goTo.filter(s => s.step === value));
      console.log(value);

      const stepLabel = goTo.filter(s => s.step === value)[0].stepLabel;
      return stepLabel || steps.filter(s => s.id === value)[0].title;
    };

    return steps ? (
      <Element className="Step" name={`step-${id}`}>
        <style global jsx>
          {`
            .Step {
              border-top: 1px solid black;
              padding: 3em 0;
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
          `}
        </style>
        {type === 'place' ? (
          <div>
            <Editable
              {...step}
              elm="h2"
              selector="title"
              storyMode={storyMode}
            />
            <Editable {...step} elm="p" selector="text" storyMode={storyMode} />
          </div>
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
        )}
      </Element>
    ) : null;
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators({ editToSteps }, dispatch)
)(Step);
