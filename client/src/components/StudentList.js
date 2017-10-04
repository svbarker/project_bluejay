import React, { Component } from "react";
import StudentCard from "./StudentCard";
import "../styles/students.css";

class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClass: null
		};
	}

	async componentDidMount() {
		await this.setState({ currentClass: this.props.classrooms[0] });
		await this.props.loadStudents(this.state.currentClass._id);
	}

	render() {
		console.log(this.props);
		return (
			<div className="student-card-container">
				{!this.props.students ? null : (
					this.props.students.map(student => <StudentCard student={student} />)
				)}
			</div>
		);
	}
}

export default StudentList;
