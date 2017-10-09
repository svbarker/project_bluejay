import React from "react";
import TextField from "material-ui/TextField";

//TODO: ADD CENTERED TEXT INPUT

// const centerText = {
//   display: "flex",
//   textAlign: "center"
// };

//A click to edit in place component
//Supply me a onSubmit property (called when 'Enter' is pressed or onBlur)

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
  isValidInput = string => string.length > 0;

  //clicking away allows for resetting
  onBlur = e => {
    if (this.isValidInput(e.target.value)) {
      this.setState({ editMode: false, text: e.target.value });
      this.props.onSubmit(e);
    } else {
      this.setState({ editMode: false });
    }
  };
  onKeyDown = e => {
    if (e.key === "Enter") {
      if (this.isValidInput(e.target.value)) {
        this.setState({ editMode: false, text: e.target.value });
        this.props.onSubmit(e);
      } else {
        this.setState({ editMode: false });
      }
    }
  };
  render = () => {
    if (this.state.editMode) {
      return (
        <TextField
          ref={input => {
            if (input) input.focus();
          }}
          name={this.props.name}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
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
  };
}

export default Editable;
