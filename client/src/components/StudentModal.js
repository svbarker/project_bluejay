import React from "react";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";

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
    return (
      <Paper>
        <List onClick={this.handleOpen}>
          <ListItem>Student 1</ListItem>
        </List>
        <Dialog
          title="Full list of students"
          actions={null}
          modal={false}
          open={this.state.open}
        >
          <List onClick={this.handleClose}>
            <ListItem>Student 1</ListItem>
            <ListItem>Student 1</ListItem>
            <ListItem>Student 1</ListItem>
          </List>
        </Dialog>
      </Paper>
    );
  }
}

export default StudentsModal;
