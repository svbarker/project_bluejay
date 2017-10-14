import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";

//Styles
const rewardChip = {
  fontWeight: "bold"
};

const BUTTON_MARK_COMPLETED_TEXT = "Mark Complete";
const BUTTON_PENDING_TEXT = "Pending Approval";
class StudentTaskListMenuCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  render() {
    const { task, markCompleted, user, socket } = this.props;
    const { _id, title, value, description, classroom } = task;
    const rewards = task.rewards.map(reward => {
      //no keys, because they aren't unique fix this later
      return (
        <Chip
          key={reward._id}
          backgroundColor="#96CD28"
          style={{ margin: "5px" }}
          labelColor="#FFFFFF"
          labelStyle={rewardChip}
        >
          <Avatar
            icon={<i class="fa fa-gift" aria-hidden="true" />}
            backgroundColor="#618C0C"
          />
          {reward.title}
        </Chip>
      );
    });
    return (
      <Card
        style={{
          marginBottom: "20px",
          backgroundColor: "#85DCDC",
          marginLeft: "50px",
          marginRight: "50px"
        }}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={
            <div>
              <i className={"fa fa-tasks"} />
              {title}
            </div>
          }
          style={{
            backgroundColor: "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white", fontWeight: "bold" }}
        />
        <CardText expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <div className="menu-card-container">
              <div>
                <h3>{title}</h3>
                <hr />
                <p>{description}</p>
              </div>
              {this.props.task.status !== "CompletedTask" ? (
                <div className="menu-card-button-container">
                  <FlatButton
                    disabled={this.props.task.pending}
                    label={
                      this.props.task.pending ? (
                        BUTTON_PENDING_TEXT
                      ) : (
                        BUTTON_MARK_COMPLETED_TEXT
                      )
                    }
                    icon={<i className="fa fa-check fa-1x" />}
                    style={{ color: "rgb(255,255,255)" }}
                    onClick={() => {
                      if (!this.props.task.pending)
                        markCompleted(user.id, _id, socket);
                    }}
                    backgroundColor="#1a8484"
                    hoverColor={"#3ca6a6"}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </Paper>
          <Divider />
          <Paper style={{ marginTop: "20px" }}>
            <div className="rewards-chip-container">
              {/* center this */}
              <div className="rewards-chip-header">
                <h3>Rewards Given For Completing This Task</h3>
              </div>
              <div className="rewards-chip-list">{rewards}</div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default StudentTaskListMenuCard;
