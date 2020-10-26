import React, { Component } from "react";
import Layout from "./components";
import Topbar from "./components/Topbar";

import { Redirect } from "react-router-dom";

class MasterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
    };
  }
  handleLogout = () => {
    const url = `http://localhost:8000/api/auth/logout`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    }).then((response) => {
      // console.log("logoutRes ", response);
      if (response.status === 204) {
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");

        this.setState({
          redirect: true,
        });
      }
    });
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    if (this.state.redirect) {
      return <Redirect push to="/sign-in" />;
    }
    const { children } = this.props;
    return (
      <div className="MasterLayout">
        <div id="wrapper">
          <Topbar  onLogout={this.handleLogout}/>
          <Layout.LeftSidebar />
          <div className="content-page">
            {/* page content start */}
            <Layout.PageContent>{children}</Layout.PageContent>
            {/* page content end  */}

            {/* footer  start */}
            <Layout.Footer />
            {/* footer end  */}
          </div>
        </div>
      </div>
    );
  }
}

export default MasterLayout;