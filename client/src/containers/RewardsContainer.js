import React from "react";
import { connect } from "react-redux";

//components
import { Card, CardHeader } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import LoadScreen from "../components/LoadScreen";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../styles/RewardList.css";

//actions
import {
  createReward,
  getAllRewards,
  editReward,
  deleteReward
} from "../actions/rewards";
import { loginTeacher } from "../actions/index";

class RewardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true
    };
  }
  componentDidMount = async () => {
    //login the teacher
    if (Object.keys(this.props.user).length === 0) {
      loginTeacher();
    } else {
      this.getRewards();
      this.setState({ fetchingRewards: true });
    }
  };
  //grab all the rewards
  getRewards = async () => {
    await this.props.fetchRewards(this.props.user.id);
    this.setState({
      fetchingRewards: false,
      loading: false
    });
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
    console.log("a reward looks like ", this.props.rewards[0]);
    const rewards = this.props.rewards.map(reward => (
      <Card key={reward._id} className="reward-container">
        <CardHeader actAsExpander={true}>
          <h3>{reward.title}</h3>
        </CardHeader>
        <ListItem
          className="reward-item"
          style={{ hoverColor: "none" }}
          expandable={true}
        >
          <p>Reward: {reward.description}</p>
          <p>Cost: {reward.cost || reward.value}</p>
          <p>Available: {reward.status}</p>
          <FlatButton
            onClick={() => {
              this.props.removeReward(reward._id);
            }}
            label="delete"
          />
          <FlatButton onClick={null} label="set unavailable" />
        </ListItem>
      </Card>
    ));
    return (
      <Paper className="reward-container">
        {/* header */}
        <h1>{this.props.user.displayName}'s Rewards</h1>
        <List className="reward-list">{rewards}</List>
        <FlatButton onClick={this.getRewards} label="testing" />
        <FlatButton onClick={this.props.createReward} label="create reward" />
      </Paper>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    rewards: state.rewards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReward: teacher => {
      dispatch(createReward(teacher));
    },
    fetchRewards: teacherId => {
      dispatch(getAllRewards(teacherId));
    },
    removeReward: rewardId => {
      dispatch(deleteReward(rewardId));
    },
    updateReward: (id, editedReward) => {
      dispatch(editReward(id, editedReward));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer);
