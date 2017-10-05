import { connect } from "react-redux";
import { loadStudents } from "../actions/student";
import StudentList from "../components/StudentList";

const mapStateToProps = state => {
	console.log(state);
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
