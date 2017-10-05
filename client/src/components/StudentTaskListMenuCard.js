import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

class StudentTaskListMenuCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ///
  }
  render() {
    const { title, value, description, classroom, _id } = this.props.task;
    const { markCompleted, user } = this.props;

    return (
      <Card style={{ "margin-bottom": "20px", "background-color": "#85DCDC" }}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          style={{
            "background-color": "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white", "font-weight": "bold" }}
        />
        <CardText expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <div class="menu-card-container">
              <p>{description}</p>
              <div className="menu-card-button-container">
                <FlatButton
                  label="Mark Completed"
                  style={{ color: "rgb(255,255,255)" }}
                  onClick={markCompleted(user._id, _id)}
                  backgroundColor="#1a8484"
                  hoverColor="#3ca6a6"
                />
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default StudentTaskListMenuCard;
