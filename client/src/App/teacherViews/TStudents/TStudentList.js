import React, { Component } from "react";
import StudentCard from "./TStudentCard";
import ClassAssign from "./TClassAssign";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import "./TStudents.css";

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
			<div className="students-container">
				<Paper style={{ padding: "4px", borderRadius: "22px" }}>
					<div className="students-container-inner">
						<SelectField
							labelStyle={{ fontFamily: "Bree Serif" }}
							menuItemStyle={{ fontFamily: "Bree Serif" }}
							floatingLabelText="Current Class"
							value={this.state.classIndex}
							onChange={this.handleChange}
						>
							{this.props.classrooms.map((classroom, i) =>
								<MenuItem
									key={classroom._id}
									value={i}
									primaryText={classroom.title}
								/>
							)}
						</SelectField>
						<ClassAssign
							currentClass={this.state.currentClass}
							teacherId={this.props.teacherId}
							students={this.props.students}
						/>
						<div className="student-card-container">
							{!this.props.students
								? null
								: this.props.students.map(student =>
										<StudentCard
											key={student._id}
											student={student}
											teacherId={this.props.teacherId}
										/>
									)}
						</div>
					</div>
				</Paper>
			</div>
		);
	}
}

export default StudentList;
