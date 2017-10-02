import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ displayName, history }) => {
	return (
		<div className="navbar">
			<div className="navbar-left">
				<NavLink to="/">
					<h1>Kids' Productivity App</h1>
				</NavLink>
			</div>
			<div className="navbar-mid">
				<ul>
					<NavLink to="/students">
						<li>
							<i class="fa fa-graduation-cap" aria-hidden="true" />
						</li>
					</NavLink>
					<NavLink to="/tasks">
						<li>
							<i class="fa fa-tasks" aria-hidden="true" />
						</li>
					</NavLink>
					<NavLink to="/rewards">
						<li>
							<i class="fa fa-gift" aria-hidden="true" />
						</li>
					</NavLink>
					<NavLink to="/reports">
						<li>
							<i class="fa fa-file-text" aria-hidden="true" />
						</li>
					</NavLink>
				</ul>
			</div>
			<div className="navbar-right">
				<ul>
					<li>Welcome, {displayName}!</li>
					<li>
						<i class="fa fa-comment" aria-hidden="true" />
					</li>
					<NavLink to="/profile">
						<li>
							<i class="fa fa-user" aria-hidden="true" />
						</li>
					</NavLink>
					<li>
						<i class="fa fa-sign-out" aria-hidden="true" />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
