import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

const StudentItem = ({ onClick, student }) => {
  const unassignButton = (
    // <Undoable wait={2} resolve={onClick}>
    //   <FlatButton label="Unassign" />
    // </Undoable>
    <FlatButton label="Unassign" onClick={onClick} />
  );
  return (
    <ListItem
      primaryText={student.profile.displayName}
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
  constructor(props) {
    super(props);
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

  // unassignAll = task => {
  //   //
  // };
  //
  // unassignOne = (task, student) => {
  //   //
  // };

  render() {
    //check the amount and render ellipsis if necessary
    //make the expanded list items for the modal
    const listOfStudentItems = this.props.students.map(student => (
      <StudentItem
        key={student._id}
        student={student}
        onClick={() => this.props.unAssignOne(student._id)}
      />
    ));
    //make the small list of names that goes into the task card,
    let nameList = [];
    let defaultNameListSize = 3;
    if (defaultNameListSize >= this.props.students.length) {
      nameList = this.props.students.map(student => (
        <ListItem key={student._id}>{student.profile.displayName}</ListItem>
      ));
    } else {
      nameList = Array(defaultNameListSize)
        .fill(true)
        .map((nothing, idx) => (
          <ListItem key={this.props.students[idx]._id}>
            {this.props.students[idx].profile.displayName}
          </ListItem>
        ));
    }

    return (
      <div>
        <List className="horizontalCenterChildren" onClick={this.handleOpen}>
          {nameList}
          <i className="fa fa-ellipsis-h" />
        </List>
        <Dialog
          title={
            <ModalTitle
              onClick={() => this.props.unAssignAll(this.props.students)}
            />
          }
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <List>{listOfStudentItems}</List>
        </Dialog>
      </div>
    );
  }
}

export default StudentsModal;
