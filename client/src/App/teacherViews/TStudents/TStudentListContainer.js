import { connect } from "react-redux";
import { loadStudents } from "../../../redux/actions/student";
import { createClassroom } from "../../../redux/actions/classrooms";
import StudentList from "./TStudentList";

const mapStateToProps = state => {
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
  createClassroom: (id, title) => {
    dispatch(createClassroom(id, title));
  }
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentList
);

export default StudentListContainer;
