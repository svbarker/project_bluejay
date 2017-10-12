import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Chip from "material-ui/Chip";
import FlatButton from "material-ui/FlatButton";
//styles don't work, idk why
const rewardsChipHeader = {
  gridRowStart: "1",
  gridRowEnd: "2",
  textAlign: "center",
  padding: "10px"
};
const rewardsChipContainer = {
  display: "grid",
  gridTemplateRows: "1fr 2fr"
};

const rewardsChip = {
  height: "50px",
  fontSize: "18px",
  margin: "3px"
};
const rewardsChipP = {
  fontSize: "12px"
};
const rewardsChipList = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  gridRowStart: "2",
  padding: "8px"
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
      return (
        <Chip key={reward._id} style={rewardsChip}>
          <Avatar src="images/rewards/rewards1.png" />
          <p>{reward.title}</p>
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
                    hoverColor="#3ca6a6"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </Paper>
          <Divider />
          <Paper style={{ marginTop: "20px" }}>
            <div
              style={rewardsChipContainer}
              className="rewards-chip-container"
            >
              {/* center this */}
              <div style={rewardsChipHeader} className="rewards-chip-header">
                <h3>Rewards Given For Completing This Task</h3>
              </div>
              <div style={rewardsChipList} className="rewards-chip-list">
                {rewards}
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default StudentTaskListMenuCard;
