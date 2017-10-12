import React from "react";

//components
import Editable from "../../GlobalComponents/Editable";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

export default class CreateRewardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      valid: false,
      title: "",
      description: "",
      kind: "Loot",
      cost: 0
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleChange = (e, index, value) => {
    this.setState({ kind: value });
  };

  handleClose = () => {
    const { description, kind, cost, title } = this.state;
    if (this.state.valid)
      this.props.onSubmit({ description, kind, cost, title });
    this.setState({
      open: false,
      title: "",
      description: "",
      kind: "Loot",
      cost: 0
    });
  };
  validate = () => {
    if (this.state.description.length > 0 && this.state.title.length > 0) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validate());
  };

  render() {
    const actions = [
      <RaisedButton
        label="Create"
        disabled={!this.state.valid}
        onClick={this.handleClose}
        labelColor="black"
        backgroundColor="#97cb39"
        icon={<i style={{ color: "black" }} className={"fa fa-save"} />}
      />,
      <RaisedButton
        label="Cancel"
        onClick={this.handleClose}
        labelColor="white"
        backgroundColor="#960d0d"
        icon={<i style={{ color: "white" }} className="fa fa-times" />}
      />
    ];

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center"
          }}
        >
          <RaisedButton
            backgroundColor={"#96cd28"}
            icon={<i className="fa fa-plus" />}
            label="Reward"
            onClick={this.handleOpen}
          />
        </div>
        <br />
        <br />
        <Dialog
          title="Create a new reward!"
          actions={actions}
          actionsContainerStyle={{
            display: "flex",
            flexDirection: "row",
            margin: "10px",
            justifyContent: "space-evenly"
          }}
          modal={true}
          open={this.state.open}
          style={{ color: "#97cb39" }}
        >
          <Paper style={{ padding: "20px", border: "3px solid #97cb39" }}>
            <TextField
              onChange={this.onChange}
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#97cb39" }}
              value={this.state.title}
              floatingLabelText="Title"
              fullWidth={true}
              multiLine={true}
              name="title"
            />
            <TextField
              onChange={this.onChange}
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#97cb39" }}
              value={this.state.description}
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              name="description"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
              }}
            >
              <TextField
                onChange={this.onChange}
                floatingLabelStyle={{ color: "grey" }}
                underlineFocusStyle={{ borderColor: "#97cb39" }}
                value={this.state.cost}
                floatingLabelText="Cost/Value"
                name="cost"
              />
              <SelectField
                floatingLabelText="Kind"
                value={this.state.kind}
                floatingLabelStyle={{ color: "grey" }}
                underlineFocusStyle={{ borderColor: "#97cb39" }}
                selectedMenuItemStyle={{ color: "#97cb39" }}
                onChange={this.handleChange}
              >
                <MenuItem value={"Loot"} primaryText="Loot" />
                <MenuItem value={"Point"} primaryText="Point" />
              </SelectField>
            </div>
          </Paper>
        </Dialog>
      </div>
    );
  }
}
