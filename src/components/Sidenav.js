import React from 'react';
import { Consumer } from './Context';
import Nav from 'react-bootstrap/Nav';
import Label from './Label';

const Sidenav = () => {
  let newLabel = React.createRef();

  return (
    <Consumer>
      { context => {
        //Update side nav with new label on submit
        const handleNewLabel = (e) => {
          e.preventDefault();
          context.actions.addLabel(newLabel.current.value);
          newLabel.current.value = "";
        }

        return (
        <Nav id="side_nav" className="flex-column side_nav mr-auto" bg="dark" variant="dark">
          <Nav.Link onClick={ () => context.actions.updateLabelFilter("")}>All Notes</Nav.Link>
            <React.Fragment>
              {context.labels.map( (label, index) =>
                  <Label
                    label={label}
                    key={index}
                    index={index}
                  />
                )}
            </React.Fragment>
            <input
              type="text"
              className="label_input"
              placeholder="New Label"
              ref={newLabel}>
            </input>
            <button className="add_label" onClick={handleNewLabel}>Add Label</button>
        </Nav>
      )}}
    </Consumer>

  );
}

export default Sidenav;
