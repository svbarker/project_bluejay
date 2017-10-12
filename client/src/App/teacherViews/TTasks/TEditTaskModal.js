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
      <h1>Modify your task:</h1>
    </div>
  );
};
const style = {
  margin: 12,
  color: "white"
};
class TEditTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: this.props.task.title,
      description: this.props.task.description
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = e => {
    this.setState({ open: false });
  };
  onSave = e => {
    this.props.onSubmit({
      title: this.state.title,
      description: this.state.description
    });
    this.setState({ open: false });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        style={style}
        hoverColor={"#960D0D"}
        labelColor="white"
        backgroundColor="#960D0D"
        onClick={this.handleClose}
        icon={<i style={{ color: "white" }} className={"fa fa-times"} />}
      />,
      <FlatButton
        label="Save"
        style={style}
        hoverColor={"#1A8484"}
        labelColor="white"
        backgroundColor="#1A8484"
        onClick={this.onSave}
        icon={<i style={{ color: "white" }} className={"fa fa-save"} />}
      />
    ];
    return (
      <div>
        <RaisedButton
          onClick={this.handleOpen}
          backgroundColor={"#1A8484"}
          labelColor="white"
          icon={<i style={{ color: "white" }} className="fa fa-edit" />}
          label="Edit"
        />
        <Dialog
          title={<ModalTitle />}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          <div style={{ padding: "10px", border: "3px solid #1A8484" }}>
            <TextField
              floatingLabelText="title"
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#1A8484" }}
              floatingLabelFixed={true}
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
            <TextField
              floatingLabelText="description"
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#1A8484" }}
              floatingLabelFixed={true}
              fullWidth={true}
              multiLine={true}
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default TEditTaskModal;
