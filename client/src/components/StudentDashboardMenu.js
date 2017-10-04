import React from "react";
// import "../index.css";
import "../styles/DashboardMenu.css";
import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";

//THOUGHTS: It'd be nice to scale down the icons when on smaller screens

const StudentDashboardMenu = () => {
  return (
    <Paper className="dashboard-menu">
      <Link to="/tasks">
        <Paper id="dashboard-menu-item2" className="dashboard-menu-item">
          <div className="dashboard-menu-grid">
            <h3 id="dashboard-item-higher">Tasks</h3>
            <i className="fa fa-tasks fa-5x" />
          </div>
        </Paper>
      </Link>
      <Link to="/rewards">
        <Paper id="dashboard-menu-item3" className="dashboard-menu-item">
          <div className="dashboard-menu-grid">
            <h3>Rewards</h3>
            <i className="fa fa-gift fa-5x" />
          </div>
        </Paper>
      </Link>
    </Paper>
  );
};

export default StudentDashboardMenu;
