import React, { Component } from "react";
import Assignable from "./TAssignable";
import { Card, CardHeader, CardText } from "material-ui/Card";

class RewardAssignList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRewards(this.props.userId);
  }

  render() {
    return (
      <div>
        <Card style={{ backgroundColor: "#d8f996" }}>
          <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
            style={{
              backgroundColor: "#96cd28"
            }}
            title="Rewards"
            titleStyle={{
              fontWeight: "bold",
              fontSize: "16px"
            }}
          />
          <CardText expandable={true}>
            <div className="card-container">
              {this.props.rewards.map(reward => {
                return (
                  <Assignable
                    key={reward._id}
                    resource={reward}
                    type="rewards"
                  />
                );
              })}
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default RewardAssignList;
