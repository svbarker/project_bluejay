import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import Chip from "material-ui/Chip";

//actions
import { getAllRewards } from "../../../redux/actions/rewards";

class SRewardsWallet extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.fetchRewards(this.props.userId, "Student");
  };
  render = () => {
    let pendingRewards;
    if (this.props.rewards.length) {
      pendingRewards = this.props.rewards.map(reward => (
        <ListItem key={reward._id}>
          <NavLink to="/rewards">
            <Chip>{reward.title}</Chip>
          </NavLink>
        </ListItem>
      ));
    } else {
      pendingRewards = <h3>Sorry...you have no rewards pending.</h3>;
    }

    return (
      <Paper>
        <h1>Pending Rewards</h1>
        <Divider />
        <List>{pendingRewards}</List>
      </Paper>
    );
  };
}

const mapStateToProps = state => {
  return {
    rewards: state.rewards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRewards: (userId, userKind) => {
      dispatch(getAllRewards(userId, userKind));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SRewardsWallet);
