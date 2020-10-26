import React, { Component } from "react";
import MasterLayout from "./../../layouts/MasterLayout";
// import Chart from "react-google-charts";

// import Select from "react-select";

import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      token: localStorage.getItem("token"),
    };
  }

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }

    return (
      <div className="Dashboard">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                </div>
                <h4 className="page-title">Dashboard</h4>
              </div>
            </div>
          </div>
        </MasterLayout>
      </div>
    );
  }
}

export default Dashboard;
