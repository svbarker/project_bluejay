import React from "react";
import { connect } from "react-redux";

//components
import { Card, CardHeader } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../styles/RewardList.css";

//actions
import { getAllRewards, createReward } from "../actions/rewards";
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
    //slight fix for jumping into page at /rewards

    //login the teacher
    if (Object.keys(this.props.user).length === 0) {
      //login the teacher
      loginTeacher();
    } else {
      this.getRewards(); //slight fix for jumping into page at /rewards
      this.setState({ fetchingRewards: true });
    }
  };
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
      return <div>LOADING</div>;
    }

    const rewards = this.props.rewards.map(reward => (
      <Card key={reward._id} className="reward-container">
        <CardHeader actAsExpander={true}>
          <h3>Some Reward </h3>
        </CardHeader>
        <ListItem
          className="reward-item"
          style={{ hoverColor: "none" }}
          expandable={true}
        >
          <p>Reward: {reward.description}</p>
          <p>Cost: {reward.cost || reward.value}</p>
          <p>Available: {reward.status}</p>
          <FlatButton onClick={null} label="delete" />
          <FlatButton onClick={null} label="set unavailable" />
        </ListItem>
      </Card>
    ));
    console.log("rewards = ", this.props.rewards);
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
  // console.log("state in rewards = ", state);
  return {
    user: state.user,
    rewards: state.rewards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRewards: teacherId => {
      // console.log("dispatching ", teacherId);
      dispatch(getAllRewards(teacherId));
    },
    createReward: teacher => {
      dispatch(createReward(teacher));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer);
