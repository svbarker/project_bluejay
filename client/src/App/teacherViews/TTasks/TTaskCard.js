import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import { Card, CardHeader, CardText } from "material-ui";
import Chip from "material-ui/Chip";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

import StudentModal from "./TStudentModal";
import TEditTaskModal from "./TEditTaskModal";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

const DropDownAddReward = ({ rewards, addReward }) => {
  const options = rewards.map(reward => (
    <MenuItem
      key={reward._id}
      onClick={() => addReward(reward._id)}
      primaryText={reward.title}
    />
  ));
  return (
    <IconMenu
      iconButtonElement={<i className="fa fa-plus" aria-hidden="true" />}
    >
      {options}
    </IconMenu>
  );
  return <FlatButton label="add" />;
};

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  //when the edit modal sends an edit add the task id
  onSubmit = taskUpdates =>
    this.props.editTask(this.props.task._id, taskUpdates);

  //what is this
  render() {
    const { title, value, description, classroom } = this.props.task;
    const { students } = this.props;
    //redux store has task with reward ids, so we do some finding
    const rewards = this.props.task.rewards.map(rewardId => {
      const reward = this.props.allRewards.find(
        reward => reward._id === rewardId
      );
      if (!reward) return null;
      return (
        <Chip
          key={reward._id}
          style={null}
          onRequestDelete={() => {
            this.props.onRemoveReward(reward._id);
          }}
        >
          <Avatar src="images/rewards/rewards1.png" />
          <p>{reward.title}</p>
        </Chip>
      );
    });
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
          <Divider />
          <Paper style={{ marginTop: "20px" }}>
            <div className="menu-card-container">
              {/* center this */}
              <div style={{ textAlign: "center", padding: "10px" }}>
                <h3>Rewards Given For Completing This Task</h3>
              </div>
              {rewards}
              <DropDownAddReward
                rewards={this.props.allRewards}
                addReward={this.props.onAddReward}
              />
              {/* <div style={{ display: "flex", flexDirection: "row" }}>
                {rewards}
              </div> */}
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default TaskCard;
