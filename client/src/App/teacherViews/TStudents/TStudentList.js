import React, { Component } from "react";
import StudentCard from "./TStudentCard";
import ClassAssign from "./TClassAssign";
import AddStudentModal from "./TAddStudentModal";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import "./TStudents.css";
import validator from "validator";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: null,
      classIndex: 0,
      open: false,
      fnameError: null,
      lnameError: null,
      emailError: null
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
    this.fnameValidate(e.target.fname.value);
    this.lnameValidate(e.target.lname.value);
    this.emailValidate(e.target.email.value);

    if (
      !this.state.fnameError &&
      !this.state.lnameError &&
      !this.state.emailError
    ) {
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
    }
  };

  fnameValidate = fname => {
    let error = validator.isEmpty(fname) ? "First name is required." : null;
    error =
      error ||
      (validator.isAlpha(fname)
        ? null
        : "First name must contain only letters.");

    this.setState({ fnameError: error });
  };

  lnameValidate = lname => {
    let error = validator.isEmpty(lname) ? "Last name is required." : null;
    error =
      error ||
      (validator.isAlpha(lname)
        ? null
        : "Last name must contain only letters.");

    this.setState({ lnameError: error });
  };

  emailValidate = email => {
    let error = validator.isEmpty(email) ? "Email is required." : null;
    error =
      error ||
      (validator.isEmail(email) ? null : "Please enter a valid email.");

    this.setState({ emailError: error });
  };

  validate = e => {
    this[`${e.target.id}Validate`](e.target.value);
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
              {this.props.classrooms.map((classroom, i) => (
                <MenuItem
                  key={classroom._id}
                  value={i}
                  primaryText={classroom.title}
                />
              ))}
            </SelectField>
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
            <AddStudentModal
              handleClose={this.handleClose}
              handleSubmit={this.handleSubmit}
              validate={this.validate}
              fnameError={this.state.fnameError}
              lnameError={this.state.lnameError}
              emailError={this.state.emailError}
              open={this.state.open}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default StudentList;
