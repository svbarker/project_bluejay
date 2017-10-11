import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import Subheader from "material-ui/Subheader";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

const StudentItem = ({ onClick, student }) => {
  const unassignButton = (
    <div>
      <Undoable wait={2} resolve={onClick}>
        <FlatButton
          label="Unassign"
          backgroundColor="white"
          hoverColor="#DC2B2B"
        />
      </Undoable>
    </div>
  );

  return (
    <ListItem
      primaryText={student.profile.displayName}
      hoverColor="#97cb39"
      rightIconButton={unassignButton}
    />
  );
};

const ModalTitle = ({ onClick }) => {
  return (
    <div className="modal-title-container">
      <div>
        <h1>Students Assigned This Task</h1>
      </div>
      <div className="modal-title-button">
        <Undoable wait={2} tickDown={true} resolve={onClick}>
          <FlatButton label="Unassign All" />
        </Undoable>
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

  render() {
    //check the amount and render ellipsis if necessary
    //make the expanded list items for the modal
    const listOfStudentItems = this.props.students.map(student => (
      <StudentItem
        key={student._id}
        student={student}
        style={{ textAlign: "center" }}
        onClick={() => this.props.unAssignOne(student._id)}
      />
    ));
    //make the small list of names that goes into the task card,
    let nameList = [];
    let defaultNameListSize = 3;
    if (this.props.students.length === 0) {
      nameList = null;
    } else if (defaultNameListSize >= this.props.students.length) {
      nameList = this.props.students.map(student => (
        <ListItem key={student._id}>{student.profile.displayName}</ListItem>
      ));
    } else {
      nameList = Array(defaultNameListSize)
        .fill(true)
        .map((nothing, idx) => (
          <ListItem
            key={this.props.students[idx]._id}
            style={{ textAlign: "center" }}
          >
            {this.props.students[idx].profile.displayName}
          </ListItem>
        ));
      nameList.push(<i key="more" className="fa fa-ellipsis-v" />);
    }

    return (
      <div>
        <List className="horizontalCenterChildren" onClick={this.handleOpen}>
          <Subheader style={{ textAlign: "center" }}>
            Students Assigned
          </Subheader>
          {nameList ? nameList : <h5>No Students</h5>}
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
          <List>
            <Subheader>Students Assigned</Subheader>
            {listOfStudentItems}
          </List>
        </Dialog>
      </div>
    );
  }
}

export default StudentsModal;
