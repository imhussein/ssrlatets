import React, { Component } from "react";
import Navbar from "./Navbar";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onClick() {
    console.log("Clicked");
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="home">
            <p className="flow-text">Home Page</p>
            <button onClick={this.onClick.bind(this)} className="btn pink">
              Click
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
