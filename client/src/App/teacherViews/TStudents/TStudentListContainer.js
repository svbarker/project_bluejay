import { connect } from "react-redux";
import { loadStudents } from "../../../redux/actions/student";
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
  }
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentList
);

export default StudentListContainer;
