import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { DragSource } from "react-dnd";

const assignableSource = {
	beginDrag(props) {
		const item = { id: props.id };
		return item;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}

		const item = monitor.getItem();
		const droppedOn = monitor.getDropResult();
		console.log(`Dropped ${item} on ${droppedOn}`);
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource()
	};
}

class Assignable extends Component {
	constructor() {
		super();
	}

	render() {
		const { resource, connectDragSource } = this.props;

		return connectDragSource(
			<div>
				<Paper>
					<div className="task-card">
						<h4>{resource.title}</h4>
						<p>{resource.description}</p>
					</div>
				</Paper>
			</div>
		);
	}
}

export default DragSource("task", assignableSource, collect)(Assignable);
