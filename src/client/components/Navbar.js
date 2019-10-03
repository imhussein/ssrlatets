import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="indigo" style={{ marginBottom: "20px" }}>
        <div className="nav-wrapper">
          <div className="container">
            <Link to="/" className="brand-logo">
              Test
            </Link>
            <ul className="right">
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
