import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StudentListContainer from "./TStudentListContainer";
import TaskAssignListContainer from "./TTaskAssignListContainer";
import RewardAssignListContainer from "./TRewardAssignListContainer";
import RaisedButton from "material-ui/RaisedButton";

class StudentView extends React.Component {
	render() {
		return (
			<div className="student-view-outer-container">
				<h1>{`${this.props.name}'s Students`}</h1>
				<div className="student-view-container">
					<StudentListContainer />
					<div>
						<div
							style={{
								display: "flex",
								flexFlow: "row nowrap",
								justifyContent: "center"
							}}
						>
							<div>
								<RaisedButton
									labelColor={"white"}
									backgroundColor={"#1a8484"}
									onClick={this.props.toggle("tasks")}
									icon={
										<i style={{ color: "white" }} className="fa fa-tasks" />
									}
									label={"Tasks"}
									style={{ margin: "8px" }}
								/>
								<RaisedButton
									labelColor={"white"}
									backgroundColor={"#96cd28"}
									onClick={this.props.toggle("rewards")}
									icon={<i style={{ color: "white" }} className="fa fa-gift" />}
									label={"Rewards"}
									style={{ margin: "8px" }}
								/>
							</div>
						</div>

						{this.props.selected === "tasks"
							? <TaskAssignListContainer />
							: <RewardAssignListContainer />}
					</div>
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(StudentView);
