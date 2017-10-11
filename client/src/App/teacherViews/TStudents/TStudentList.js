import React, { Component } from "react";
import StudentCard from "./TStudentCard";
import ClassAssign from "./TClassAssign";
import AddStudentContainer from "./TAddStudentContainer";
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

  componentDidMount() {
    if (this.props.classrooms.length) {
      this.setState({ currentClass: this.props.classrooms[0] });
      this.props.loadStudents(this.props.classrooms[0]._id);
    }
  }

  handleChange = async (event, index, value) => {
    await this.setState({
      currentClass: this.props.classrooms[value],
      classIndex: value
    });

    this.props.loadStudents(this.state.currentClass._id);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    return (
      <div className="students-container">
        <Paper style={{ padding: "4px", borderRadius: "22px" }}>
          <div className="students-container-inner">
            {!this.props.classrooms.length ? (
              <span>You have no classes! Add one to get started!</span>
            ) : (
              <SelectField
                labelStyle={{ fontFamily: "Bree Serif" }}
                menuItemStyle={{ fontFamily: "Bree Serif" }}
                floatingLabelText="Current Class"
                value={this.state.classIndex}
                onChange={this.handleChange}
              >
                {this.props.classrooms.map((classroom, i) => (
                  <MenuItem
                    key={classroom._id}
                    value={i}
                    primaryText={classroom.title}
                  />
                ))}
              </SelectField>
            )}
            {!this.state.currentClass ? null : (
              <div>
                <ClassAssign
                  currentClass={this.state.currentClass}
                  teacherId={this.props.teacherId}
                  students={this.props.students}
                />
                <div className="student-card-container">
                  {!this.props.students ? null : (
                    this.props.students.map(student => (
                      <StudentCard
                        key={student._id}
                        student={student}
                        teacherId={this.props.teacherId}
                      />
                    ))
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
              </div>
            )}
            {!this.state.currentClass ? null : (
              <AddStudentContainer
                classId={this.state.currentClass._id}
                open={this.state.open}
                handleClose={this.handleClose}
                loadStudents={this.props.loadStudents}
              />
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default StudentList;
