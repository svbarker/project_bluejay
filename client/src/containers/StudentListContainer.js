import { connect } from "react-redux";
import StudentList from "../components/StudentList";

const mapStateToProps = state => ({
	students: state.students
});

const mapDispatchToProps = dispatch => ({
	getStudents: () => {}
});

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(
	StudentList
);

export default StudentListContainer;
