import React from 'react';
import { Element, Link } from 'react-scroll';
import { MultiSelect } from 'react-selectize';
import { withReduxSaga } from './../../store';
import Editable from './Editable';
import { editToSteps } from './../Story/actions';

class Step extends React.Component {
  constructor(props) {
    super(props);
  }

  _editToStep = options => {
    const { id, dispatch } = this.props;
    const to = options.map(o => o.value);
    dispatch(editToSteps({ id, to }));
  };

  render() {
    const { props } = this;
    const { mode, to, stepIds } = props;
    return (
      <Element className="Step" name={`#step-${props.id}`}>
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
            }
          `}
        </style>
        <Editable {...props} elm="h2" selector="title" />
        <Editable {...props} elm="p" selector="text" />
        {mode === 'view' ? (
          <div className="GoToButtons">
            {to.map(t => (
              <Link to={`#step-${t}`} key={t} smooth={true} duration={200}>
                <button>Go to {t}</button>
              </Link>
            ))}
          </div>
        ) : (
          <MultiSelect
            placeholder="Select next steps"
            options={stepIds.map(value => ({
              label: `Step ${value}`,
              value
            }))}
            defaultValues={to.map(value => ({
              label: `Step ${value}`,
              value
            }))}
            onValuesChange={this._editToStep}
          />
        )}
      </Element>
    );
  }
}

export default withReduxSaga(Step);
