import React, { Component } from "react";
import StudentCard from "./StudentCard";
import ClassAssign from "./ClassAssign";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import "./students.css";

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
        <Paper style={{ padding: "20px", "padding-top": "0" }}>
          <SelectField
            floatingLabelText="Current Class"
            value={this.state.classIndex}
            onChange={this.handleChange}
          >
            {this.props.classrooms.map((classroom, i) => (
              <MenuItem value={i} primaryText={classroom.title} />
            ))}
          </SelectField>
          <ClassAssign
            currentClass={this.state.currentClass}
            teacherId={this.props.teacherId}
          />
        </Paper>
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
