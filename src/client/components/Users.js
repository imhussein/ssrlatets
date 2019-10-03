import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getUsers } from "../../usersReducer";

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="users-page">
            <p className="flow-text" style={{ marginBottom: "20px" }}>
              Users
            </p>
            <ul className="collapsible">
              {this.props.users.length
                ? this.props.users.map(({ name }, index) => (
                    <li
                      key={index}
                      style={{
                        boxShadow: "0 0.1 0.2rem rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                        marginBottom: "10px",
                        borderBottom: "1px solid #ccc"
                      }}
                    >
                      <div className="collapsible-header">{name}</div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const component = connect(
  ({ users: { users } }) => ({ users }),
  { getUsers }
)(Users);

export default {
  component,
  loadData: () => {}
};
