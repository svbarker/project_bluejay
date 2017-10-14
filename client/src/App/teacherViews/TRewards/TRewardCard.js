import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Editable from "../../GlobalComponents/Editable";
import { Card, CardHeader, CardText } from "material-ui";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TEditRewardModal from "./TEditRewardModal";

class RewardCard extends React.Component {
  constructor(props) {
    super(props);
  }

  //when the edit modal sends an edit add the reward id
  onSubmit = rewardUpdates =>
    this.props.editTask(this.props.reward._id, rewardUpdates);

  //what is this
  render() {
    const {
      _id,
      title,
      value,
      description,
      classroom,
      kind,
      cost,
      supply,
      available
    } = this.props.reward;
    return (
      <Card
        style={{
          marginBottom: "20px",
          backgroundColor: "#D8F996",
          marginLeft: "50px",
          marginRight: "50px"
        }}
        key={_id}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={
            <div>
              {" "}
              <i className={"fa fa-gift"} />
              {`${title} (${cost || value || "None"} Points)`}
            </div>
          }
          style={{
            backgroundColor: "#96cd28"
          }}
          iconStyle={{ color: "black" }}
          titleStyle={{ color: "black", fontWeight: "bold" }}
        />
        <CardText expandable={true}>
          <Paper
            style={{
              padding: "20px"
            }}
          >
            <div className="menu-card-container">
              <div>
                <h3>{title}</h3>
                <hr />
                <p>
                  <strong>Description: </strong>
                  {description || "None"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Kind: </strong>
                  {this.props.reward.kind === "LootReward"
                    ? "Loot"
                    : "Point"}:  Reward
                </p>
                <p>
                  <strong>
                    {this.props.reward.kind === "LootReward"
                      ? "Cost"
                      : "Value"}:{" "}
                  </strong>
                  {cost || value || "None"} points
                </p>

                {this.props.reward.kind === "LootReward" ? (
                  <p>
                    <strong>Available: </strong>
                    {available ? (
                      <i style={{ color: "#96cd28" }} className="fa fa-check" />
                    ) : (
                      <i style={{ color: "#960D0D" }} className="fa fa-times" />
                    )}
                  </p>
                ) : null}
                <p>
                  <strong>Supply: </strong>
                  {supply || "Unlimited"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "10px",
                  justifyContent: "space-evenly"
                }}
              >
                <TEditRewardModal
                  reward={this.props.reward}
                  onSubmit={updatedReward =>
                    this.props.onEditReward(updatedReward, _id)}
                />
                <Undoable
                  wait={3}
                  tickDown={true}
                  resolve={() => this.props.removeReward(_id)}
                >
                  <RaisedButton
                    backgroundColor={"#960D0D"}
                    icon={
                      <i style={{ color: "white" }} className="fa fa-trash" />
                    }
                    labelColor="#FCFCFC"
                    label="Delete"
                  />
                </Undoable>
                {this.props.reward.kind === "LootReward" ? (
                  <RaisedButton
                    labelStyle={{ color: !available ? "white" : "black" }}
                    backgroundColor={!available ? "#960D0D" : "#96CD28"}
                    onClick={() =>
                      this.props.onToggleAvailability(this.props.reward)}
                    label={"Availability"}
                  />
                ) : null}
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default RewardCard;
