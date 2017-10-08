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
import "./TRewardList.css";

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
  //grab all the rewards
  getRewards = async () => {
    await this.props.fetchRewards(this.props.user.id, this.props.user.kind);
    this.setState({
      fetchingRewards: false,
      loading: false
    });
  };
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
  onEditReward = async (newValue, id, property) => {
    console.log("editing");
    this.props.updateReward(id, { updates: { [property]: newValue } });
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
            titleStyle={{ "font-weight": "bold" }}
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
              <Editable
                onSubmit={text => {
                  this.onEditReward(text, reward._id, "description");
                }}
                text={reward.description || "None"}
                label={"description"}
                multiLine={true}
                fullWidth={true}
              >
                <p>Description: {reward.description || "None"}</p>
              </Editable>
              <p>Kind of reward: {reward.cost ? "Loot" : "Point"}</p>
              <Editable
                onSubmit={text => {
                  this.onEditReward(text, reward._id, "cost");
                }}
                text={reward.cost || "None"}
                label={"Cost"}
              >
                <p>Cost: {reward.cost || reward.value || "None"}</p>
              </Editable>

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
          <CreateRewardModal onSubmit={this.onCreateReward} />
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
