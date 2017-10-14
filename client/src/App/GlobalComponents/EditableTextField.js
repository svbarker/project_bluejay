import React from "react";
import TextField from "material-ui/TextField";

//TODO: ADD CENTERED TEXT INPUT

// const centerText = {
//   display: "flex",
//   textAlign: "center"
// };

//A click to edit in place component

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }
  onClick = e => {
    this.setState({ editMode: true });
  };
  //clicking away allows for resetting
  onBlur = e => {
    if (e.target.value.length > 0) {
      this.setState({ editMode: false });
      this.props.onSubmit(e.target.value);
    } else {
      this.setState({ editMode: false });
    }
  };
  render() {
    if (this.state.editMode) {
      return (
        <TextField
          ref={input => {
            if (input) input.focus();
          }}
          name={this.props.name}
          onBlur={this.onBlur}
          floatingLabelText={this.props.label || ""}
          defaultValue={this.props.text}
          multiLine={this.props.multiline || true}
          fullWidth={this.props.fullWidth || false}
        />
      );
    } else {
      return (
        <div name={this.props.name} onClick={this.onClick}>
          {this.props.children}
        </div>
      );
    }
  }
}

export default Editable;
