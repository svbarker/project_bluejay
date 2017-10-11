import React, { Component } from "react";
import StudentCard from "./TStudentCard";
import ClassAssign from "./TClassAssign";
import AddStudentModal from "./TAddStudentModal";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "../../Styles/StudentList.css";

class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClass: null,
			classIndex: 0,
			open: false
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

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleSubmit = async e => {
		e.preventDefault();
		console.log("I am in handleSubmit at least");
		const studentData = {
			fname: e.target.fname.value,
			lname: e.target.lname.value,
			email: e.target.email.value
		};

		await this.props.addStudentToClassroom(
			this.state.currentClass._id,
			studentData
		);
		await this.handleClose();
		await this.props.loadStudents(this.state.currentClass._id);
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
							<div className="add-student">
								<FloatingActionButton
									backgroundColor="#960d0d"
									onClick={this.handleOpen}
								>
									<ContentAdd />
								</FloatingActionButton>
							</div>
						</div>
						<AddStudentModal
							handleClose={this.handleClose}
							handleSubmit={this.handleSubmit}
							open={this.state.open}
						/>
					</div>
				</Paper>
			</div>
		);
	}
}

export default StudentList;
