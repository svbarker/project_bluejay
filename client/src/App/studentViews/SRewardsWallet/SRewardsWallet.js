//TODO: SPLIT THIS UP INTO ONE CONTAINER AND TWO COMPONENTS

import React from "react";
import { connect } from "react-redux";

import RaisedButton from "material-ui/RaisedButton";

//components
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Undoable from "../../GlobalComponents/Undoable";
import LoadScreen from "../../GlobalComponents/LoadScreen";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../../Styles/RewardList.css";
import SRewardsWalletCard from "./SRewardsWalletCard";

//actions
import { getAllRewards, redeemReward } from "../../../redux/actions/rewards";
import { loginTeacher, loginStudent } from "../../../redux/actions/index";

class StudentRewardWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true,
      selected: "Unredeemed"
    };
  }

  async componentDidMount() {
    //grab all the rewards
    await this.props.fetchRewards(this.props.userId, "Student");
    this.setState({
      fetchingRewards: false,
      loading: false
    });
  }

  navigateTo = selected => () => {
    this.setState({
      selected
    });
  };

  render = () => {
    let navigateTo = this.navigateTo;

    if (this.state.loading) {
      return <LoadScreen />;
    }
    const mapFunc = reward => {
      return reward.cost ? (
        <SRewardsWalletCard
          reward={reward}
          studentId={this.props.userId}
          redeemReward={this.props.redeemReward}
        />
      ) : null;
    };

    // THIS BREAKS OCCASIONALLY !!! -Ian
    const unredeemed = this.props.rewards
      .filter(reward => reward.status === "Unredeemed")
      .map(mapFunc);
    const pending = this.props.rewards
      .filter(reward => reward.status === "Pending")
      .map(mapFunc);
    const redeemed = this.props.rewards
      .filter(reward => reward.status === "Redeemed")
      .map(mapFunc);

    let page;

    switch (this.state.selected) {
      case "Unredeemed":
        page = (
          <Paper
            className="dashboard-menu"
            style={{
              padding: "4px",
              borderRadius: "20px"
            }}
            zDepth={5}
            rounded={true}
          >
            <div
              className="reward-container"
              style={{
                border: "5px dashed #ccc",
                borderRadius: "20px"
              }}
            >
              <h2>Unredeemed</h2>
              <List className="reward-list">{unredeemed}</List>
            </div>
          </Paper>
        );

        break;
      case "Pending":
        page = (
          <Paper
            className="dashboard-menu"
            style={{
              padding: "4px",
              borderRadius: "20px"
            }}
            zDepth={5}
            rounded={true}
          >
            <div
              className="reward-container"
              style={{
                border: "5px dashed #ccc",
                borderRadius: "20px"
              }}
            >
              <h2>Pending</h2>
              <List className="reward-list">{pending}</List>
            </div>
          </Paper>
        );

        break;
      case "Redeemed":
        page = (
          <Paper
            className="dashboard-menu"
            style={{
              padding: "4px",
              borderRadius: "20px"
            }}
            zDepth={5}
            rounded={true}
          >
            <div
              className="reward-container"
              style={{
                border: "5px dashed #ccc",
                borderRadius: "20px"
              }}
            >
              <h2>Redeemed</h2>
              <List className="reward-list">{redeemed}</List>
            </div>
          </Paper>
        );
        break;
    }

    return (
      <div className="reward-container-outer">
        <h1>{`${this.props.name}'s Wallet`}</h1>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center"
          }}
        >
          <RaisedButton
            disabled={this.state.selected === "Unredeemed"}
            onClick={navigateTo("Unredeemed")}
            backgroundColor={"rgba( 26,132,132,1)"}
            style={{ margin: "20px 20px" }}
            labelColor={"white"}
            label={"Unredeemed"}
          />
          <RaisedButton
            disabled={this.state.selected === "Pending"}
            onClick={navigateTo("Pending")}
            backgroundColor={"rgba(150,13,13,1)"}
            style={{ margin: "20px 20px" }}
            labelColor={"white"}
            label={"Pending"}
          />
          <RaisedButton
            disabled={this.state.selected === "Redeemed"}
            onClick={navigateTo("Redeemed")}
            backgroundColor={"rgba(150,205, 40,1)"}
            style={{ margin: "20px 20px" }}
            labelColor={"white"}
            label={"Redeemed"}
          />
        </div>
        {page}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    rewards: state.rewards,
    name: state.user.displayName
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRewards: (userId, userKind) => {
      dispatch(getAllRewards(userId, userKind));
    },
    redeemReward: (s_id, id) => {
      dispatch(redeemReward(s_id, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StudentRewardWallet
);
