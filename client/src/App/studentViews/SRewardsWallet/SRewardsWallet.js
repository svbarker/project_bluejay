import React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

//actions
import { getAllRewards } from "../../../redux/actions/rewards";

// const SRewardsWallet = () => <h5>Suprah Awesome Wallet Here</h5>;

class SRewardsWallet extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    // this.props.fetchRewards(this.props.userId, "Student");
  };
  render = () => {
    // const pendingRewards = this.props.fakeData.map(reward => (
    //   <Chip>{reward.title}</Chip>
    // ));

    return (
      <Paper>
        {/* {pendingRewards} */}
        <div>
          <Chip>Pending Reward</Chip>
        </div>
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
