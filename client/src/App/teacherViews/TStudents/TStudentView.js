import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StudentListContainer from "./TStudentListContainer";
import TaskAssignListContainer from "./TTaskAssignListContainer";
import RewardAssignListContainer from "./TRewardAssignListContainer";
import RaisedButton from "material-ui/RaisedButton";

const StudentView = ({ selected, toggle }) => {
  return (
    <div className="student-view-outer-container">
      <h1>Your Students</h1>
      <div className="student-view-container">
        <StudentListContainer />
        <div style={{ textAlign: "center" }} className="assignables-container">
          <h2>Drag and drop to assign:</h2>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "center"
            }}
          >
            <RaisedButton
              backgroundColor={"#1a8484"}
              onClick={toggle}
              label={"Tasks"}
              style={{ margin: "8px" }}
            />
            <RaisedButton
              backgroundColor={"#96cd28"}
              onClick={toggle}
              label={"Rewards"}
              style={{ margin: "8px" }}
            />
          </div>
          {!selected ? (
            <TaskAssignListContainer />
          ) : (
            <RewardAssignListContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(StudentView);
