import React, { Component } from "react";
import StudentCard from "./TStudentCard";
import ClassAssign from "./TClassAssign";
import AddStudentContainer from "./TAddStudentContainer";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "../../Styles/StudentList.css";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: null,
      classIndex: 0,
      open: false,
      addingClass: false
    };
  }

  componentDidMount() {
    if (this.props.classrooms.length) {
      this.props.loadStudents(this.props.classrooms[0]._id);
      this.setState({ currentClass: this.props.classrooms[0] });
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.classrooms.length && newProps.classrooms.length) {
      this.props.loadStudents(newProps.classrooms[0]._id);
      this.setState({
        currentClass: newProps.classrooms[0]
      });
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

  toggleAddClass = e => {
    e.preventDefault();
    this.setState({ addingClass: !this.state.addingClass });
  };

  addClass = async e => {
    e.preventDefault();

    if (e.target.name.value) {
      const newClass = await this.props.createClassroom(
        this.props.teacherId,
        e.target.name.value
      );
    }

    this.toggleAddClass(e);
  };

  render() {
    return (
      <div style={{ paddingTop: "50px" }}>
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
              <br />
              {!this.state.addingClass ? (
                <p>
                  <a href="" onClick={this.toggleAddClass}>
                    Add a class
                  </a>
                </p>
              ) : (
                <form onSubmit={this.addClass}>
                  <TextField id="name" floatingLabelText="Class name" />{" "}
                  <FlatButton type="submit" label="Add" />
                </form>
              )}
              <div>
                <ClassAssign
                  currentClass={this.state.currentClass}
                  teacherId={this.props.teacherId}
                  students={this.props.students}
                />
                <div className="student-card-container">
                  {this.props.students.map(student => (
                    <StudentCard
                      key={student._id}
                      student={student}
                      teacherId={this.props.teacherId}
                    />
                  ))}
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
      </div>
    );
  }
}

export default StudentList;
