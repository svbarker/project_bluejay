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
      <Card style={{ "margin-bottom": "10px" }}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          style={{
            "background-color": "#1a8484",
            color: "white"
          }}
          iconStyle={{ color: "white" }}
        >
          {title} {value}
        </CardHeader>
        <CardText expandable={true}>
          <div class="menu-card-container">
            <p>{description}</p>
            <div>
              <StudentModal />
            </div>
            <div className="menu-card-button-container">
              <FlatButton
                label="Edit Task"
                labelStyle={{ color: "white" }}
                backgroundColor="#50A040"
                hoverColor="#D8F996"
              />
              <FlatButton
                label="Delete Task"
                labelStyle={{ color: "white" }}
                backgroundColor="#DC4040"
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
