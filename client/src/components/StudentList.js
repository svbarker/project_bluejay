import React, { Component } from "react";

class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClass: null
		};
	}

	async componentDidMount() {
		await this.setState({ currentClass: this.props.classrooms[0] });
		this.props.loadStudents(this.state.currentClass.id);
	}

	render() {
		return <p>Hi</p>;
	}
}

export default StudentList;
