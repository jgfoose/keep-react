import React from 'react';
import { Consumer } from './Context';


const CardLabels = (props) => {
  return (
    <Consumer>
      { context => (
        <select id="card_label" name="labels" onChange={(event) => context.actions.updateCardLabel(props.id,event.target.value)}>
          <React.Fragment>
            {context.labels.map( (label) =>
                <option value={label} >  {label} </option>
              )}
          </React.Fragment>
        </select>
      )}
    </Consumer>
  );
}

export default CardLabels