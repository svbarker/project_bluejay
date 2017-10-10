import { connect } from "react-redux";
import { loadStudents } from "../../../redux/actions/student";
import { addStudentToClassroom } from "../../../redux/actions/classrooms";
import StudentList from "./TStudentList";

const mapStateToProps = state => {
  console.log("Student List state: ", state);
  return {
    teacherId: state.user.id,
    students: state.students,
    classrooms: state.classrooms
  };
};

const mapDispatchToProps = dispatch => ({
  loadStudents: id => {
    dispatch(loadStudents(id));
  },
  addStudentToClassroom: (id, studentData) => {
    dispatch(addStudentToClassroom(id, studentData));
  }
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentList
);

export default StudentListContainer;
