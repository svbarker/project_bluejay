import React from "react";
import TStudentView from "./TStudentView";

class TStudentViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "tasks"
    };
  }

  toggle = selected => () => {
    this.setState({
      selected
    });
  };

  render() {
    return (
      <TStudentView
        name={this.props.user.displayName}
        selected={this.state.selected}
        toggle={this.toggle}
      />
    );
  }
}

export default TStudentViewContainer;
