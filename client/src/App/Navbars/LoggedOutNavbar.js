import React from "react";

import Logo from "../GlobalComponents/Logo";

const LoggedOutNavbar = () => {
	return (
		<div className="navbar navbar-base">
			<div className="navbar-left">
				<Logo />
			</div>
		</div>
	);
};

export default LoggedOutNavbar;
