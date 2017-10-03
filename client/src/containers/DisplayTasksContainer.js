import React from "react";
import { connect } from "react-redux";

import MenuCard from "../components/MenuCard";
import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";

import { hydrateTeacherTasks } from "../actions/task";

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
    this.props.hydrateTasks(this.props.userId);
  }
  render() {
    console.log("Tasks are: ", this.props.tasks);

    const taskList = this.props.tasks.map(task => <MenuCard task={task} />);

    return <Paper>{taskList}</Paper>;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    tasks: state.tasks
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
