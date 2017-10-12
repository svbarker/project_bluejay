import React, { Component } from "react";
import Assignable from "./TAssignable";
import { Card, CardHeader, CardText } from "material-ui/Card";

class TaskAssignList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.hydrateTasks(this.props.userId);
  }

  render() {
    return (
      <div>
        <Card style={{ backgroundColor: "#3d9f9f" }}>
          <div
            style={{ textAlign: "center" }}
            className="assignables-container"
          >
            <CardText expandable={true}>
              <div className="card-container">
                {this.props.tasks.map(task => {
                  return (
                    <Assignable key={task._id} resource={task} type="tasks" />
                  );
                })}
              </div>
            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}

export default TaskAssignList;
