import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { DragSource } from "react-dnd";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Snackbar from "material-ui/Snackbar";
import Avatar from "material-ui/Avatar";

import goldBarImage from "../images/gold-bar.png";
import lootBoxImage from "../images/loot-box.png";
import taskImage from "../images/task.png";

const assignableSource = {
	beginDrag(props) {
		const item = { id: props.resource._id, type: props.type };
		return item;
	},

	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}

		// Do some animation stuff I guess?
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
		dropResult: monitor.getDropResult()
	};
}

class Assignable extends Component {
	constructor() {
		super();
		this.state = {
			message: null,
			open: false
		};
	}

	componentDidMount() {
		const img = new Image();
		img.onload = () => this.props.connectDragPreview(img);
		if (this.props.type === "tasks") {
			img.src = taskImage;
		} else if (this.props.type === "rewards") {
			if (this.props.resource.kind === "PointReward") {
				img.src = goldBarImage;
			} else {
				img.src = lootBoxImage;
			}
		}
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.dropResult) {
			const result = await nextProps.dropResult.result;
			let message;
			if (result.success) {
				message = `Successfully given to ${nextProps.dropResult.name}`;
			} else {
				message = result.apiError.message;
			}

			this.setState({
				open: true,
				message: message
			});
		}
	}

	handleRequestClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		const {
			type,
			resource,
			connectDragPreview,
			connectDragSource
		} = this.props;

		return connectDragSource(
			<div>
				<Paper>
					<Card className="task-card">
						<CardHeader
							style={{
								textAlign: "left",
								lineHeight: "40px",
								verticalAlign: "middle"
							}}
							title={resource.title}
							titleStyle={{
								fontSize: "125%"
							}}
							avatar={
								<Avatar
									src={
										type === "tasks"
											? taskImage
											: resource.kind === "PointReward"
												? goldBarImage
												: lootBoxImage
									}
									size={48}
								/>
							}
						/>
						<Divider />
						<CardText>
							{resource.description}
						</CardText>
					</Card>
				</Paper>
				<Snackbar
					open={this.state.open}
					message={this.state.message || "none"}
					autoHideDuration={1000}
					onRequestClose={this.handleRequestClose}
					bodyStyle={{ backgroundColor: "rgba(8, 90, 90, .4)" }}
				/>
			</div>
		);
	}
}

export default DragSource("assignable", assignableSource, collect)(Assignable);
