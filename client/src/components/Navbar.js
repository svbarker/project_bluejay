import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ displayName, history }) => {
	return (
		<div className="navbar">
			<div>
				<h1>Kids' Productivity App</h1>
			</div>
			<div>
				<ul>
					<NavLink to="/students">
						<li>Students</li>
					</NavLink>
					<NavLink to="/tasks">
						<li>Tasks</li>
					</NavLink>
					<NavLink to="/rewards">
						<li>Rewards</li>
					</NavLink>
					<NavLink to="/reports">
						<li>Reports</li>
					</NavLink>
				</ul>
			</div>
			<div>
				<ul>
					<li>Welcome, {displayName}!</li>
					<li>Messages</li>
					<li>Profile</li>
					<li>Log Out</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
