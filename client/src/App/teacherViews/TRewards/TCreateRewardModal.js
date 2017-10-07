import React from "react";

//components
import Editable from "../../GlobalComponents/Editable";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class CreateRewardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      valid: false,
      description: "",
      kind: "Loot",
      cost: 0
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { description, kind, cost } = this.state;
    if (this.state.valid) this.props.onSubmit({ description, kind, cost });
    this.setState({
      open: false,
      description: "",
      kind: "Loot",
      cost: 0
    });
  };
  validate = () => {
    if (this.state.description.length > 0) {
      this.setState({ valid: true });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validate());
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Create"
        primary={true}
        disabled={!this.state.valid}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <RaisedButton label="Create Reward" onClick={this.handleOpen} />
        <Dialog
          title="Create a new reward for your students!"
          actions={actions}
          modal={true}
          open={this.state.open}
          style={{ color: "#97cb39" }}
        >
          <Paper style={{ padding: "20px", border: "10px solid #97cb39" }}>
            <TextField
              onChange={this.onChange}
              value={this.state.description}
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              name="description"
            />
            <TextField
              onChange={this.onChange}
              value={this.state.cost}
              floatingLabelText="Cost"
              name="cost"
            />
            <TextField
              onChange={this.onChange}
              value={this.state.kind}
              floatingLabelText="Kind"
              name="kind"
            />
          </Paper>
        </Dialog>
      </div>
    );
  }
}
