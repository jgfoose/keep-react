import React from 'react';
import { Consumer } from './Context';


const CardLabels = (props) => {
  return (
    <Consumer>
      { context => (
        <select className="card_label" id="card_labels" name="labels" value={props.label} onChange={(event) => context.actions.updateCardLabel(props.id,event.target.value)}>
          <option  selected value>--Select A Label--</option>
          <option value="No Label">No Label</option>
          <React.Fragment>
            {context.labels.map( (label) =>
                <option value={label}> {label} </option>
              )}
          </React.Fragment>
        </select>
      )}
    </Consumer>
  );
}

export default CardLabels