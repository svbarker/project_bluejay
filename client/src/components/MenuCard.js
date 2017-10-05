import React from "react";

import { Card, CardHeader, CardText } from "material-ui";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

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
      <Card style={{ "margin-bottom": "20px", "background-color": "#85DCDC" }}>
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={title}
          style={{
            "background-color": "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white", "font-weight": "bold" }}
        />
        <CardText expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <div class="menu-card-container">
              <p>{description}</p>
              <div>
                <StudentModal />

                <div className="menu-card-button-container">
                  <RaisedButton label="Edit" />
                  <RaisedButton
                    label="Delete"
                    style={{ "margin-left": "20px" }}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default MenuCard;
