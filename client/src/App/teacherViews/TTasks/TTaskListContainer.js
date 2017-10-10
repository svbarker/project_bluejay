import React from "react";
import { connect } from "react-redux";

//components
import TaskList from "./TTaskList";
//actions
import { loadStudents } from "../../../redux/actions/student";
import {
  hydrateTeacherTasks,
  unAssignTask,
  bulkUnassignTask,
  editTask,
  deleteTask
} from "../../../redux/actions/task";
import { getAllRewards } from "../../../redux/actions/rewards";

class TaskListContainer extends React.Component {
  constructor(props) {
    super(props);
    //hotfix
    if (props.students.length) {
      if (props.tasks.length) {
        this.state = {
          loaded: true
        };
      }
      this.state = {
        loaded: true
      };
    } else {
      this.state = {
        loaded: false
      };
    }
  }
  componentDidMount() {
    this.props.hydrateTasks(this.props.userId);
    this.props.getAllRewards(this.props.userId, "Teacher");
    //hotfix
    if (!this.props.students.length) {
      if (this.props.classrooms.length) {
        this.props.classrooms.forEach(async classroom => {
          this.props.loadStudents(classroom._id);
        });
      }
    }
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

  //unassigment functionality passed all the way down
  //to taskCard, and StudentModal
  onUnAssignAll = (task, students = null) => {
    let studentIds = students.map(student => student._id);
    this.props.bulkUnassignTask(task, studentIds);
  };
  onUnAssignOne = async (task, studentId) => {
    this.props.unAssignTask(task, studentId);
  };
  //delete a task
  onDelete = (teacherId, taskId) => {
    this.props.deleteTask(teacherId, taskId);
  };
  //edit a task
  onEdit = (taskId, taskUpdates) => {
    this.props.editTask(taskId, taskUpdates);
  };
  onRemoveReward = (task, rewardId) => {
    //setup what the rewards should include before passing to edit
    const taskUpdates = {
      rewards: task.rewards.filter(reward_id => reward_id !== rewardId)
    };
    this.props.editTask(task._id, taskUpdates);
  };
  onAddReward = (task, rewardId) => {
    this.props.editTask(task._id, {
      rewards: task.rewards.slice().concat(rewardId)
    });
  };
  render() {
    if (this.state.loaded) {
      return (
        <TaskList
          unAssignAll={this.onUnAssignAll}
          unAssignOne={this.onUnAssignOne}
          tasks={this.props.tasks}
          allRewards={this.props.rewards}
          onRemoveReward={this.onRemoveReward}
          onAddReward={this.onAddReward}
          students={this.props.students}
          deleteTask={taskId => this.onDelete(this.props.userId, taskId)}
          editTask={this.onEdit}
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
    name: state.user.displayName,
    rewards: state.rewards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadStudents: classId => {
      dispatch(loadStudents(classId));
    },
    hydrateTasks: id => {
      dispatch(hydrateTeacherTasks(id));
    },
    unAssignTask: (task, studentId) => {
      dispatch(unAssignTask(task, studentId));
    },
    bulkUnassignTask: (task, studentIds) => {
      dispatch(bulkUnassignTask(task, studentIds));
    },
    deleteTask: (teacherId, taskId) => dispatch(deleteTask(teacherId, taskId)),
    editTask: (taskId, taskUpdates) => dispatch(editTask(taskId, taskUpdates)),
    getAllRewards: (userId, userKind) =>
      dispatch(getAllRewards(userId, userKind))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);
