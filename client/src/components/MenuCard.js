import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

import StudentModal from "../components/StudentModal";

class MenuCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ///
  }
  render() {
    const { title, value, description, classroom } = this.props.task;
    return (
      <Card style={{ "margin-bottom": "20px" }}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          style={{
            "background-color": "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white" }}
        />
        <CardText expandable={true} style={{ "background-color": "#85DCDC" }}>
          <div class="menu-card-container">
            <p>{description}</p>
            <div>
              <StudentModal />
            </div>
            <div className="menu-card-button-container">
              <FlatButton
                label="Edit"
                backgroundColor="#96cd28"
                hoverColor="#D8F996"
              />
              <FlatButton
                label="Delete"
                labelStyle={{ color: "white" }}
                backgroundColor="#DC2B2B"
                hoverColor="#FF9A9A"
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default MenuCard;
