import React, { Component } from "react";
import StudentCard from "./StudentCard";
import ClassAssign from "./ClassAssign";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import "../styles/students.css";

class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClass: null,
			classIndex: 0
		};
	}

	async componentDidMount() {
		await this.setState({ currentClass: this.props.classrooms[0] });
		await this.props.loadStudents(this.state.currentClass._id);
	}

	handleChange = (event, index, value) => {
		this.setState({
			currentClass: this.props.classrooms[value],
			classIndex: value
		});
	};

	render() {
		console.log(this.props);
		return (
			<div>
				<span>Current Class: </span>
				<DropDownMenu
					value={this.state.classIndex}
					onChange={this.handleChange}
				>
					{this.props.classrooms.map((classroom, i) => (
						<MenuItem value={i} primaryText={classroom.title} />
					))}
				</DropDownMenu>
				<ClassAssign
					currentClass={this.state.currentClass}
					teacherId={this.props.teacherId}
				/>
				<div className="student-card-container">
					{!this.props.students ? null : (
						this.props.students.map(student => (
							<StudentCard student={student} teacherId={this.props.teacherId} />
						))
					)}
				</div>
			</div>
		);
	}
}

export default StudentList;
