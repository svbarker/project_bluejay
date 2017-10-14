import React from "react";
import TStudentView from "./TStudentView";
import { connect } from "react-redux";

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

const mapStateToProps = state => {
  return {
    classrooms: state.classrooms
  };
};

export default connect(mapStateToProps, null)(TStudentViewContainer);
