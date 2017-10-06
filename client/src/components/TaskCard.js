import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

import StudentModal from "../components/StudentModal";

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
            "background-color": "#1a8484"
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
                <StudentModal students={students} />

                <div className="menu-card-button-container">
                  <RaisedButton label="Edit" />
                  <RaisedButton label="Delete" style={{ marginLeft: "20px" }} />
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
