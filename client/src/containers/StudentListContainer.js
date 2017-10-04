import { connect } from "react-redux";
import StudentList from "../components/StudentList";

const mapStateToProps = state => ({
	students: state.students,
	classrooms: state.classrooms
});

const mapDispatchToProps = dispatch => ({
	getStudents: () => {}
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
	StudentList
);

export default StudentListContainer;
