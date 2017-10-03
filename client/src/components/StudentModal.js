import React from "react";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

const StudentItem = props => {
  const unassignButton = (
    <FlatButton
      label="Unassign"
      onClick={() => {
        console.log("clicking");
      }}
    />
  );
  return (
    <ListItem
      primaryText={"Student1"}
      secondaryText={"assigned on [insert date]"}
      rightIconButton={unassignButton}
      hoverColor="none"
    />
  );
};

class StudentsModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    //check the amount and render ellipsis if necessary
    return (
      <Paper>
        <List className="horizontalCenterChildren" onClick={this.handleOpen}>
          <ListItem>Student 1</ListItem>
          <i className="fa fa-ellipsis-v" />
        </List>
        <Dialog
          title="Full list of students"
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>
            <StudentItem />
            <StudentItem />
            <StudentItem />
          </List>
        </Dialog>
      </Paper>
    );
  }
}

export default StudentsModal;
