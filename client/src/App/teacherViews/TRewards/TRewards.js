//TODO: SPLIT THIS UP INTO ONE CONTAINER AND TWO COMPONENTS

import React from "react";
import { connect } from "react-redux";

//components
import CreateRewardModal from "./TCreateRewardModal";
import Undoable from "../../GlobalComponents/Undoable";
import Editable from "../../GlobalComponents/Editable";
import LoadScreen from "../../GlobalComponents/LoadScreen";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TEditRewardModal from "./TEditRewardModal";
import "../../Styles/RewardList.css";

//actions
import {
  createReward,
  getAllRewards,
  editReward,
  deleteReward
} from "../../../redux/actions/rewards";
import { loginTeacher, loginStudent } from "../../../redux/actions/index";

class TeacherRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true
    };
  }

  async componentDidMount() {
    await this.props.fetchRewards(this.props.user.id, this.props.user.kind);
    this.setState({
      fetchingRewards: false,
      loading: false
    });
  }

  onCreateReward = async rewardInput => {
    this.props.createReward(this.props.user.id, rewardInput);
  };
  //change the availability of a reward
  onToggleAvailability = async reward => {
    reward.available = !reward.available;
    this.props.updateReward(reward._id, {
      updates: { available: reward.available }
    });
  };
  onEditReward = async (updatedReward, id) => {
    if (updatedReward.cost === undefined) delete updatedReward.cost;
    if (updatedReward.value === undefined) delete updatedReward.value;
    this.props.updateReward(id, { updates: updatedReward });
  };
  render = () => {
    if (this.state.loading) {
      return <LoadScreen />;
    }

    //TODO: ADD A RADIO-BUTTON TO CHANGE THE AVAILABILITY SETTINGS
    //THE REWARDS CARDS ////
    const rewards = this.props.rewards.map(reward => {
      return (
        <Card
          key={reward._id}
          className="reward-container"
          style={{
            backgroundColor: "#D8F996"
          }}
        >
          <CardHeader
            title={reward.title}
            titleStyle={{ fontWeight: "bold" }}
            subtitle={`costs ${reward.cost || reward.value || "None"}`}
            className="reward-card-header"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            className="reward-item"
            style={{ hoverColor: "none" }}
            expandable={true}
          >
            <Paper style={{ padding: "20px" }}>
              <p>Description: {reward.description || "None"}</p>
              <p>Kind of reward: {reward.cost ? "Loot" : "Point"}</p>
              <p>Cost: {reward.cost || reward.value || "None"}</p>

              <p>Available: {reward.available ? "YES" : "NO"}</p>
              <p>Supply: {reward.supply || "Unlimited"}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "10px",
                  justifyContent: "space-evenly"
                }}
              >
                <TEditRewardModal
                  reward={reward}
                  onSubmit={updatedReward =>
                    this.onEditReward(updatedReward, reward._id)}
                />
                <Undoable resolve={() => this.props.removeReward(reward._id)}>
                  <RaisedButton label="delete" />
                </Undoable>
                <RaisedButton
                  onClick={() => this.onToggleAvailability(reward)}
                  label={
                    reward.available ? "Make Unavailable" : "Make Available"
                  }
                />
              </div>
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
          <CreateRewardModal onSubmit={this.onCreateReward} />
        </div>
        {/* Rewards List */}
        {rewards}
      </Paper>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    rewards: state.rewards,
    classrooms: state.classrooms
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReward: (teacher, rewardInput) => {
      dispatch(createReward(teacher, rewardInput));
    },
    fetchRewards: (userId, userKind) => {
      dispatch(getAllRewards(userId, userKind));
    },
    removeReward: rewardId => {
      dispatch(deleteReward(rewardId));
    },
    updateReward: (id, updates) => {
      dispatch(editReward(id, updates));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherRewards);
