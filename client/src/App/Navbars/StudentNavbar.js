import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Badge from "material-ui/Badge";

class StudentNavbar extends Component {
  constructor() {
    super();
  }

  logout = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-left">
          <NavLink to="/">
            <h1>Kids' Productivity App</h1>
          </NavLink>
        </div>
        <div className="navbar-mid">
          <ul>
            <li>{this.props.points} points</li>
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
              <li>
                <i className="fa fa-comment" aria-hidden="true" />
              </li>
            </NavLink>
            <NavLink to="/profile">
              <li>
                <i className="fa fa-user" aria-hidden="true" />
              </li>
            </NavLink>
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
