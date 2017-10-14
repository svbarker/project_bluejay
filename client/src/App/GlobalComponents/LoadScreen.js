import React from "react";
import ReactLoading from "react-loading";
import Paper from "material-ui/Paper";
import loadingPencilImage from "../Images/loading-pencil-test.gif";
const loadingIconStyle = {
	width: "200px",
	height: "263px"
};

const LoadScreen = () => {
	return (
		<div className="loading-outer">
			<div
				style={{
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "center"
				}}
			>
				<Paper
					className="dashboard-menu"
					style={{
						padding: "4px",
						borderRadius: "20px"
					}}
					zDepth={5}
					rounded={true}
				>
					<div
						className="task-container"
						style={{
							height: "293px",
							position: "relative",
							border: "5px dashed #ccc",
							borderRadius: "20px"
						}}
					>
						<h1>Loading...</h1>
						<h2>Please give us a second to complete your task</h2>
						<div className="loading">
							<img src={loadingPencilImage} style={loadingIconStyle} />
							{/*<ReactLoading
								style={loadingIconStyle}
								className="loading-icon"
								type="bars"
								color="#85dcdc"
							/>*/}
						</div>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default LoadScreen;
