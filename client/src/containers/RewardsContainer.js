import React from "react";
import { connect } from "react-redux";

import FlatButton from "material-ui/FlatButton";
import { getAllRewards, createReward } from "../actions/rewards";

class RewardsContainer extends React.Component {
  constructor() {
    super();
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <div>
        <div>Rewards</div>
        <div>Rewards</div>
        <div>Rewards</div>
        <div>Rewards</div>
        <div>Rewards</div>
        <FlatButton onClick={this.props.fetchRewards} label="testing" />
        <FlatButton onClick={this.props.createReward} label="create reward" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state in rewards = ", state);
  return {
    user: state.user
    rewards: state.rewards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRewards: () => {
      dispatch(getAllRewards());
    },
    createReward: teacher => {
      dispatch(createReward(teacher));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer);
