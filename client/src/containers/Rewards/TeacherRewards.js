//TODO: SPLIT THIS UP INTO ONE CONTAINER AND TWO COMPONENTS

import React from "react";
import { connect } from "react-redux";

//components
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Undoable from "../../components/Undoable";
import LoadScreen from "../../components/LoadScreen";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import "../../styles/RewardList.css";

//actions
import {
  createReward,
  getAllRewards,
  editReward,
  deleteReward
} from "../../actions/rewards";
import { loginTeacher, loginStudent } from "../../actions/index";

class TeacherRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true
    };
  }
  //grab all the rewards
  getRewards = async () => {
    await this.props.fetchRewards(this.props.user.id, this.props.user.kind);
    this.setState({
      fetchingRewards: false,
      loading: false
    });
  };
  onCreateReward = async () => {
    //placeholder
    //open a modal???
    //this.props.createReward()
    console.log("making a reward");
    return null;
  };
  onToggleAvailability = async reward => {
    //
    reward.available = !reward.available;
    // console.log("reward = ", reward);
    this.props.updateReward(reward._id, { updates: { status: "YES" } });
    // this.props.updateReward(reward._id, {
    //   updates: { available: reward.available }
    // });
    return null;
  };
  render = () => {
    if (this.state.loading) {
      if (
        Object.keys(this.props.user).length !== 0 &&
        !this.state.fetchingRewards
      ) {
        //go fetch some data
        this.getRewards();
      }
      //display load screen
      return <LoadScreen />;
    }

    //TODO: ADD IN-PLACE EDITING FOR DESCRIPTION/ COST/VALUE
    //TODO: ADD A RADIO-BUTTON TO CHANGE THE AVAILABILITY SETTINGS
    /////////IF THE USER IS THE TEACHER
    const rewards = this.props.rewards.map(reward => {
      //custom buttons for students and teachers
      return (
        <Card
          key={reward._id}
          className="reward-container"
          style={{
            "background-color": "#D8F996"
          }}
        >
          <CardHeader
            title={reward.title}
            titleStyle={{ "font-weight": "bold" }}
            subtitle={`costs ${reward.cost || reward.value || "None"}`}
            className="reward-card-header"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText className="reward-item" expandable={true}>
            <Paper style={{ padding: "20px" }}>
              <p>Description: {reward.description || "None"}</p>
              <p>Kind of reward: {reward.cost ? "Loot" : "Point"}</p>
              {/* <p>Kind of reward: {reward.kind}</p> */}
              <p>Cost: {reward.cost || reward.value || "None"}</p>
              <p>Available: {reward.available ? "YES" : "NO"}</p>
              <p>Supply: {reward.supply || "Unlimited"}</p>
              <Undoable resolve={() => this.props.removeReward(reward._id)}>
                <RaisedButton label="delete" />
              </Undoable>
              <RaisedButton
                onClick={() => this.onToggleAvailability(reward)}
                label={reward.available ? "Make Unavailable" : "Make Available"}
              />
            </Paper>
          </CardText>
        </Card>
      );
    });
    return (
      <Paper className="reward-container outer" style={{ padding: "20px" }}>
        {/* header */}
        <div className="reward-card-title">
          <h2>{this.props.user.displayName}'s Rewards</h2>
          {/* <div onClick={this.onCreateReward}>
            <i class="fa fa-plus" aria-hidden="true" />
          </div> */}
          <RaisedButton onClick={this.onCreateReward} label="create reward" />
        </div>
        {/* Rewards List */}
        {rewards}
      </Paper>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    rewards: state.rewards,
    classrooms: state.classrooms
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReward: teacher => {
      dispatch(createReward(teacher));
    },
    fetchRewards: (userId, userKind) => {
      dispatch(getAllRewards(userId, userKind));
    },
    removeReward: rewardId => {
      dispatch(deleteReward(rewardId));
    },
    updateReward: (id, editedReward) => {
      dispatch(editReward(id, editedReward));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherRewards);
