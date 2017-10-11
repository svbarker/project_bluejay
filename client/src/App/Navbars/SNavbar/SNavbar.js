import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Badge from "material-ui/Badge";
import * as Events from "../../../redux/actions/events";
import "../../Styles/Navbar.css";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

class StudentNavbar extends Component {
	constructor(props) {
		super(props);
		this.props.socket.on(Events.REFRESH_NOTIFICATIONS, () => {
			this.props.refreshPoints();
			this.props.fetchStudentNotifications(this.props.user.id);
		});
	}

	logout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		return (
			<div className="navbar navbar-base">
				<div className="navbar-left">
					<NavLink to="/">
						<h1>
							{"Kids' Productivity App"}
						</h1>
					</NavLink>
				</div>
				<div className="navbar-mid">
					<ul>
						<li>
							{this.props.points} points
						</li>
						<NavLink to="/tasks">
							<li>
								<i className="fa fa-tasks" aria-hidden="true" />
							</li>
						</NavLink>
						<NavLink to="/rewards">
							<li>
								<i className="fa fa-gift" aria-hidden="true" />
							</li>
						</NavLink>
					</ul>
				</div>
				<div className="navbar-right">
					<ul>
						<li>
							<img className="avatar" src={this.props.avatar} />
						</li>
						<NavLink to="/notifications">
							<li style={{ position: "relative" }}>
								<i className="fa fa-comment" aria-hidden="true" />
								{!this.props.notifications.length
									? null
									: <Badge
											className="navbar-notification-badge"
											style={{ position: "absolute" }}
											badgeContent={this.props.notifications.length}
											primary={true}
										/>}
							</li>
						</NavLink>
						<li>
							<IconMenu
								iconButtonElement={
									<i className="fa fa-user" aria-hidden="true" />
								}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
								targetOrigin={{ horizontal: "right", vertical: "top" }}
							>
								<NavLink to="/rewardsWallet">
									<MenuItem primaryText="RewardsWallet" />
								</NavLink>
								<NavLink to="/">
									<MenuItem primaryText="Other great places" />
								</NavLink>
								<NavLink to="/secretpage">
									<MenuItem primaryText="Other great places" />
								</NavLink>
							</IconMenu>
						</li>
						<a href="" onClick={this.logout}>
							<li>
								<i className="fa fa-sign-out" aria-hidden="true" />
							</li>
						</a>
					</ul>
				</div>
			</div>
		);
	}
}

export default StudentNavbar;
