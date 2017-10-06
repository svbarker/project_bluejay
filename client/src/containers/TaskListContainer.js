import React from "react";
import { connect } from "react-redux";

//components
import TaskList from "../components/TaskList";
//actions
import { loadStudents } from "../actions/student";
import { hydrateTeacherTasks } from "../actions/task";

class TaskListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  componentWillMount() {
    this.props.hydrateTasks(this.props.userId);
  }
  componentWillReceiveProps(props) {
    if (props.userId) {
      if (this.props.userId !== props.userId) {
        this.props.hydrateTasks(this.props.userId);
      }
      if (this.props.classrooms !== props.classrooms) {
        props.classrooms.forEach(async classroom => {
          this.props.loadStudents(classroom._id);
        });
      }
      if (this.props.students !== props.students) {
        this.setState({ loaded: true });
      }
    }
  }

  //when a task card is clicked hydrate the students for that task
  hydrateStudentList = task => {
    //
  };

  render() {
    if (this.state.loaded) {
      return (
        <TaskList
          tasks={this.props.tasks}
          students={this.props.students}
          hydrateStudentList={this.hydrateStudentList}
          name={this.props.name}
        />
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
//
const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    students: state.students,
    classrooms: state.classrooms,
    name: state.user.displayName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadStudents: classId => {
      dispatch(loadStudents(classId));
    },
    hydrateTasks: id => {
      dispatch(hydrateTeacherTasks(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
