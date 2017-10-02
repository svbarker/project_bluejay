import React from "react";
import "../index.css";
import "../styles/DashboardMenu.css";
import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";

const DashboardMenu = () => {
  return (
    <Paper style={{ backgroundColor: "#ff6161" }} className="dashboard-menu">
      <Link to="/students">
        <Paper id="dashboard-menu-item1" className="dashboard-menu-item">
          <div className="dashboard-menu-grid">
            <h3>Students</h3>
            <i className="fa fa-graduation-cap fa-5x" />
          </div>
        </Paper>
      </Link>
      <Link to="/tasks">
        <Paper id="dashboard-menu-item2" className="dashboard-menu-item">
          <div className="dashboard-menu-grid">
            <h3 id="dashboard-item-higher">Tasks</h3>
            {/* <i id="dashboard-item-lower" className="material-icons">
              insert icon
            </i> */}
            <i className="fa fa-graduation-cap fa-5x" />
          </div>
        </Paper>
      </Link>
      <Link to="/rewards">
        <Paper id="dashboard-menu-item3" className="dashboard-menu-item">
          <div className="dashboard-menu-grid">
            <h3>Rewards</h3>
            <i className="fa fa-graduation-cap fa-5x" />
          </div>
        </Paper>
      </Link>
    </Paper>
  );
};

export default DashboardMenu;
