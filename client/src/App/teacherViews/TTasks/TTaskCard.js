import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

import StudentModal from "./TStudentModal";
import TEditTaskModal from "./TEditTaskModal";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ///
  }
  hydrateList = () => {
    console.log("grabbing students for a task");
  };
  //when the edit modal sends an edit add the task id
  onSubmit = taskUpdates =>
    this.props.editTask(this.props.task._id, taskUpdates);

  //what is this
  render() {
    const { title, value, description, classroom } = this.props.task;
    const { students } = this.props;
    return (
      <Card style={{ marginBottom: "20px", backgroundColor: "#85DCDC" }}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          style={{
            backgroundColor: "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white", fontWeight: "bold" }}
          onClick={this.hydrateList}
        />
        <CardText expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <div className="menu-card-container">
              <p>{description}</p>
              <div>
                <StudentModal
                  unAssignAll={this.props.unAssignAll}
                  unAssignOne={this.props.unAssignOne}
                  students={students}
                />

                <div className="menu-card-button-container">
                  <TEditTaskModal
                    open={true}
                    task={this.props.task}
                    onSubmit={this.onSubmit}
                  />
                  <Undoable wait={1} resolve={() => this.props.deleteTask()}>
                    <RaisedButton
                      label="Delete"
                      style={{ marginLeft: "20px" }}
                    />
                  </Undoable>
                </div>
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default TaskCard;
