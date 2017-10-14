import { connect } from "react-redux";
import { loadStudents } from "../../../redux/actions/student";
import { createClassroom } from "../../../redux/actions/classrooms";
import StudentList from "./TStudentList";
import { deleteClass } from "../../../redux/actions/classrooms";
import { deleteStudent } from "../../../redux/actions/student";

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
  },
  deleteClass: id => {
    dispatch(deleteClass(id));
  },
  deleteStudent: id => {
    dispatch(deleteStudent(id));
  }
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
  StudentList
);

export default StudentListContainer;
