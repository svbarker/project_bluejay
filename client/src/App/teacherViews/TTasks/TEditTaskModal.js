import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

const ModalTitle = props => {
  return (
    <div className="modal-title-container">
      <h1>Edit THAT TASK</h1>
    </div>
  );
};
const style = {
  margin: 12
};
class TEditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = e => {
    this.setState({ open: false });
  };
  onSave = e => {
    console.log("saving");
    console.log("event = ", e.target);
    this.setState({ open: false });
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        style={style}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        secondary={true}
        style={style}
        onClick={this.onSave}
      />
    ];
    return (
      <div>
        <RaisedButton onClick={this.handleOpen} label="Edit" />
        <Dialog
          title={<ModalTitle />}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          <div>
            <TextField
              floatingLabelText="title"
              floatingLabelFixed={true}
              underlineShow={false}
              name="title"
              defaultValue={this.props.task.title}
            />
            <TextField
              floatingLabelText="description"
              floatingLabelFixed={true}
              fullWidth={true}
              underlineShow={false}
              multiLine={true}
              name="description"
              defaultValue={this.props.task.description}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default TEditTaskModal;
