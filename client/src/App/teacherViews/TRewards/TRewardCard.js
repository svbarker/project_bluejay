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
      cost,
      supply,
      available
    } = this.props.reward;

    return (
      <Card
        key={_id}
        className="reward-container"
        style={{
          backgroundColor: "#D8F996",
          margin: "10px"
        }}
      >
        <CardHeader
          title={title}
          titleStyle={{ fontWeight: "bold" }}
          subtitle={`costs ${cost || value || "None"}`}
          className="reward-card-header"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          className="reward-item"
          style={{ hoverColor: "none" }}
          expandable={true}
        >
          <Paper style={{ padding: "20px" }}>
            <p>Description: {description || "None"}</p>
            <p>Kind of reward: {cost ? "Loot" : "Point"}</p>
            <p>Cost: {cost || value || "None"}</p>

            <p>Available: {available ? "YES" : "NO"}</p>
            <p>Supply: {supply || "Unlimited"}</p>
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
              <Undoable resolve={() => this.props.removeReward(_id)}>
                <RaisedButton label="delete" />
              </Undoable>
              <RaisedButton
                onClick={() =>
                  this.props.onToggleAvailability(this.props.reward)}
                label={available ? "Make Unavailable" : "Make Available"}
              />
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default RewardCard;
