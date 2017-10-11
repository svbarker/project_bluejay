import React, { Component } from "react";
import { connect } from "react-redux";
import CreateTaskModal from "./TCreateTaskModal";

class CreateTaskContainer extends Component {
	constructor(props) {
		super(props);
	}

	createTask = e => {
		const params = {
			title: e.target.title.value,
			description: e.target.description.value
		};
	};

	render() {
		return <CreateTaskModal />;
	}
}

export default CreateTaskContainer;
