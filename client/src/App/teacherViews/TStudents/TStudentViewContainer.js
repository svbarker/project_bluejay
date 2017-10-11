import React from "react";
import TStudentView from "./TStudentView";

class TStudentViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: true
    };
  }

  toggle = () => {
    this.setState({
      selected: !this.state.selected
    });
  };

  render() {
    return <TStudentView selected={this.state.selected} toggle={this.toggle} />;
  }
}

export default TStudentViewContainer;
