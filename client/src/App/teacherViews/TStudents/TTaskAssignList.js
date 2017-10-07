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
        <Card style={{ "background-color": "#85dcdc" }}>
          <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
            style={{
              "background-color": "#1a8484"
            }}
            iconStyle={{ color: "white" }}
            title="Tasks"
            titleStyle={{
              color: "white",
              "font-weight": "bold",
              "font-size": "16px"
            }}
          />
          <CardText expandable={true}>
            <div className="card-container">
              {this.props.tasks.map(task => {
                return <Assignable resource={task} type="tasks" />;
              })}
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default TaskAssignList;
