import React from "react";
import { connect } from "react-redux";

import MenuCardContainer from "./MenuCardContainer";
import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";

// const fakeData = [
//   { title: "task1", points: ">9000" },
//   { title: "task12", points: ">9000" },
//   { title: "task3", points: ">9000" }
// ];

class MenuTasksContainer extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.hydrateTasks(userId);
  }
  render() {
    const taskList = this.props.tasks.map(task => (
      <MenuCardContainer task={task} />
    ));

    return <Paper>{taskList}</Paper>;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  };
};
const mapDispatchToProps = state => {
  return {
    hydrateTasks: id => {
      hydrateTeacherTasks(id);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTasksContainer);
