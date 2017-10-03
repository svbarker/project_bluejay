import React from "react";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

const StudentItem = ({ onClick }) => {
  const unassignButton = <FlatButton label="Unassign" onClick={onClick} />;
  return (
    <ListItem
      primaryText={"Student1"}
      secondaryText={"assigned on [insert date]"}
      rightIconButton={unassignButton}
      hoverColor="none"
    />
  );
};

const ModalTitle = ({ onClick }) => {
  return (
    <div className="modal-title-container">
      <div>
        <h1>Full list of students</h1>
      </div>
      <div className="modal-title-button">
        <FlatButton onClick={onClick} label="Unassign All" />
      </div>
    </div>
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

  unassignAll = () => {
    //
  };

  unassignOne = () => {
    //
  };

  render() {
    //check the amount and render ellipsis if necessary
    return (
      <Paper>
        <List className="horizontalCenterChildren" onClick={this.handleOpen}>
          <ListItem>Student 1</ListItem>
          <i className="fa fa-ellipsis-h" />
        </List>
        <Dialog
          title={<ModalTitle onClick={this.unassignAll} />}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>
            <StudentItem onClick={this.unassignOne} />
            <StudentItem onClick={this.unassignOne} />
            <StudentItem onClick={this.unassignOne} />
          </List>
        </Dialog>
      </Paper>
    );
  }
}

export default StudentsModal;
