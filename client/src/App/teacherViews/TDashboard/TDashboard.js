import React from "react";
// import "../index.css";
import "./TDashboard.css";
import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";

//THOUGHTS: It'd be nice to scale down the icons when on smaller screens

const DashboardMenu = () => {
	return (
		<div className="dashboard-container">
			<h1>Teacher Dashboard</h1>
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
					className="dashboard-menu-inner"
					style={{
						border: "5px dashed #ccc",
						borderRadius: "22px"
					}}
				>
					<Link to="/students">
						<Paper id="dashboard-menu-item1" className="dashboard-menu-item">
							<div className="dashboard-menu-grid">
								<h3 style={{ color: "#dc2b2b" }}>Students</h3>
								<i className="fa fa-graduation-cap fa-5x" />
							</div>
						</Paper>
					</Link>
					<Link to="/tasks">
						<Paper id="dashboard-menu-item2" className="dashboard-menu-item">
							<div className="dashboard-menu-grid">
								<h3 style={{ color: "#1a8484" }} id="dashboard-item-higher">
									Tasks
								</h3>
								<i className="fa fa-tasks fa-5x" />
							</div>
						</Paper>
					</Link>
					<Link to="/rewards">
						<Paper id="dashboard-menu-item3" className="dashboard-menu-item">
							<div className="dashboard-menu-grid">
								<h3 style={{ color: "#96cd28" }}>Rewards</h3>
								<i className="fa fa-gift fa-5x" />
							</div>
						</Paper>
					</Link>
				</div>
			</Paper>
		</div>
	);
};

export default DashboardMenu;
