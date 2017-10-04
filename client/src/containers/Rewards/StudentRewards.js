//TODO: SPLIT THIS UP INTO ONE CONTAINER AND TWO COMPONENTS

import React from "react";
import { connect } from "react-redux";

//components
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import LoadScreen from "../../components/LoadScreen";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import "../../styles/RewardList.css";

//actions
import {
  createReward,
  getAllRewards,
  editReward,
  deleteReward
} from "../../actions/rewards";
import { loginTeacher, loginStudent } from "../../actions/index";

class StudentRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingRewards: false,
      loading: true
    };
    //testing
    // const broke = true;
    // if (broke) {
    //   this.props.user.points = 0;
    // } else {
    //   this.props.user.points = 20;
    // }
  }
  componentDidMount = async () => {
    //login the teacher
    if (Object.keys(this.props.user).length === 0) {
      // if (this.state.userType === "Teacher") {
      //   loginTeacher();
      // } else if (this.state.userType === "Student") {
      //   loginStudent();
      // }
    } else {
      this.getRewards();
      this.setState({ fetchingRewards: true });
    }
  };
  //grab all the rewards
  getRewards = async () => {
    //TESTING STUDENTS
    console.log("user = ", this.props.user);
    await this.props.fetchRewards(this.props.user.id, this.props.user.kind);
    // await this.props.fetchStudentRewards(this.props.user.id);
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
  onPurchase = async reward => {
    //check points
    if (reward.cost > this.props.user.points) {
      //no canz buyz
      //show error if not possible
    } else {
      //else purchase
    }
  };
  //A TEST FUNCTION OF THE STUDENTS PATCH FUNCTIONALITY,
  /////NOT FUNCTIONING
  getMoarPoints = async change => {
    let points = this.props.user.points++;
    // let response = await fetch(`api/students/${this.props.user.id}`, {
    //   method: "PATCH",
    //   credentials: "include",
    //   body: JSON.stringify({
    //     updates: { classrooms: this.props.classrooms, points }
    //   })
    // });
    // console.log("moar points response = ", response);
    // let data = await response.json();
    // console.log("moar datat = ", data);
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
      return (
        <Card key={reward._id} className="reward-container">
          <CardHeader
            title={reward.title}
            subtitle={`costs ${reward.cost || reward.value || "None"}`}
            className="reward-card-header"
            actAsExpander={true}
          />
          <CardText
            className="reward-item"
            style={{ hoverColor: "none" }}
            expandable={true}
          >
            <p>Description: {reward.description || "None"}</p>
            <p>Cost: {reward.cost || reward.value || "None"}</p>
            <p>Available: {reward.status || "Unknown"}</p>
            <FlatButton
              onClick={() => this.onPurchase(reward)}
              disabled={this.props.user.points < reward.cost ? true : false}
              primary={this.props.user.points > reward.cost ? true : false}
              label="purchase"
            />
          </CardText>
        </Card>
      );
    });
    return (
      <Paper className="reward-container">
        {/* header */}
        <div className="reward-card-title">
          <h1>{this.props.user.displayName}'s Rewards</h1>
          {/* <div onClick={this.onCreateReward}>
            <i class="fa fa-plus" aria-hidden="true" />
          </div> */}
          <h5>Your points</h5>
          <h5>{this.props.user.points}</h5>
          <FlatButton label="Get More" onClick={this.getMoarPoints} />
        </div>
        {/* Rewards List */}
        <List className="reward-list">{rewards}</List>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentRewards);
