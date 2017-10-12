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
        <Card style={{ backgroundColor: "#96cd28" }}>
          <div
            style={{ textAlign: "center" }}
            className="assignables-container"
          >
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
          </div>
        </Card>
      </div>
    );
  }
}

export default RewardAssignList;
