import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import Editable from "../../GlobalComponents/Editable";
import { Card, CardHeader, CardText } from "material-ui";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

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
        style={{
          marginBottom: "20px",
          backgroundColor: "#D8F996",

          marginLeft: "50px",
          marginRight: "50px"
        }}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={
            <div>
              <i className={"fa fa-gift"} />
              {`${title} (${cost || "?"} Points)`}
            </div>
          }
          style={{
            backgroundColor: "#96cd28"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "black", fontWeight: "bold" }}
        />
        <CardText expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <h2>{title}</h2>
            <h4>{cost || "?"} Points</h4>
            <hr />
            <h3>Description: </h3>
            <p>{description || "None"}</p>
            <p>
              <strong>
                Available:
                {available ? (
                  <i style={{ color: "#96cd28" }} className="fa fa-check" />
                ) : (
                  <i style={{ color: "#960D0D" }} className="fa fa-times" />
                )}
              </strong>
            </p>
            <Undoable
              disabled={this.props.points < cost ? true : false}
              resolve={() => this.props.onPurchase(_id)}
              wait={2}
            >
              <FlatButton
                backgroundColor={"#96cd28"}
                labelColor={"black"}
                disabled={this.props.points < cost ? true : false}
                label="purchase"
                hoverColor={"#96cd28"}
              />
            </Undoable>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default RewardCard;
