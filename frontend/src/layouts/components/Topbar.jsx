import React, { Component } from "react";
import { Link } from "react-router-dom";

const menuButtonClass = "enlarged";
let menuButtonActive = false;

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // handleClickMenuButton for manage enlarged menu sidebar
  handleClickMenuButton = () => {
    menuButtonActive = !menuButtonActive;
    menuButtonActive
      ? document.body.classList.add(menuButtonClass)
      : document.body.classList.remove(menuButtonClass);
  };

  render() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    return (
      <div className="navbar-custom" style={{ backgroundColor: "#9096A8" }}>
        <ul className="list-unstyled topnav-menu float-right mb-0">
          {/* <li className="d-none d-sm-block">
            <form className="app-search">
              <div className="app-search-box">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <div className="input-group-append">
                    <button className="btn" type="submit">
                      <i className="fe-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </li> */}

          {/* <li className="dropdown notification-list">
            <a
              className="nav-link dropdown-toggle  waves-effect waves-light"
              data-toggle="dropdown"
              href="#!"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="fe-bell noti-icon"></i>
              <span className="badge badge-danger rounded-circle noti-icon-badge">
                9
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-lg">
           
              <div className="dropdown-item noti-title">
                <h5 className="m-0">
                  <span className="float-right">
                    <a href="#!" className="text-dark">
                      <small>Clear All</small>
                    </a>
                  </span>
                  Notification
                </h5>
              </div>
              <div className="slimscroll noti-scroll">
            
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon bg-primary">
                    <i className="mdi mdi-settings-outline"></i>
                  </div>
                  <p className="notify-details">
                    New settings
                    <small className="text-muted">
                      There are new settings available
                    </small>
                  </p>
                </a>
  
                <a
                  href="#!"
                  className="dropdown-item notify-item active"
                >
                  <div className="notify-icon">
                    <img
                      src="assets/images/users/avatar-1.jpg"
                      className="img-fluid rounded-circle"
                      alt=""
                    />{" "}
                  </div>
                  <p className="notify-details">Cristina Pride</p>
                  <p className="text-muted mb-0 user-msg">
                    <small>Hi, How are you? What about our next meeting</small>
                  </p>
                </a>
           
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon bg-warning">
                    <i className="mdi mdi-bell-outline"></i>
                  </div>
                  <p className="notify-details">
                    Updates
                    <small className="text-muted">
                      There are 2 new updates available
                    </small>
                  </p>
                </a>
              
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon">
                    <img
                      src="assets/images/users/avatar-4.jpg"
                      className="img-fluid rounded-circle"
                      alt=""
                    />{" "}
                  </div>
                  <p className="notify-details">Karen Robinson</p>
                  <p className="text-muted mb-0 user-msg">
                    <small>
                      Wow ! this admin looks good and awesome design
                    </small>
                  </p>
                </a>
               
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon bg-danger">
                    <i className="mdi mdi-account-plus"></i>
                  </div>
                  <p className="notify-details">
                    New user
                    <small className="text-muted">
                      You have 10 unread messages
                    </small>
                  </p>
                </a>
          
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon bg-info">
                    <i className="mdi mdi-comment-account-outline"></i>
                  </div>
                  <p className="notify-details">
                    Caleb Flakelar commented on Admin
                    <small className="text-muted">4 days ago</small>
                  </p>
                </a>
                <a
                  href="#!"
                  className="dropdown-item notify-item"
                >
                  <div className="notify-icon bg-secondary">
                    <i className="mdi mdi-heart"></i>
                  </div>
                  <p className="notify-details">
                    Carlos Crouch liked
                    <b>Admin</b>
                    <small className="text-muted">13 days ago</small>
                  </p>
                </a>
              </div>
              <a
                href="#!"
                className="dropdown-item text-center text-primary notify-item notify-all"
              >
                View all
                <i className="fi-arrow-right"></i>
              </a>
            </div>
          </li> */}

          <li className="dropdown notification-list">
            <a
              className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
              data-toggle="dropdown"
              href="#!"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              {/* <img
                src="assets/images/users/avatar-1.jpg"
                alt="user-image"
                className="rounded-circle"
              /> */}
              <div className="rounded-circle" style={{ color: "#fff" }}>
                <span>{email}</span>
                <i className="fe-chevrons-down"></i>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
              {/* item  */}
              <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome {username}!</h6>
              </div>
              <div className="dropdown-divider"></div>

              {/* item  */}
              <button
                onClick={() => this.props.onLogout()}
                className="dropdown-item notify-item"
              >
                <i className="fe-log-out"></i>
                <span>Logout</span>
              </button>
            </div>
          </li>

          {/* <li className="dropdown notification-list">
            <a
              href="#!"
              className="nav-link right-bar-toggle waves-effect waves-light"
            >
              <i className="fe-settings noti-icon"></i>
            </a>
          </li> */}
        </ul>

        {/* LOGO  */}
        <div className="logo-box">
          <Link to="/dashboard" className="logo text-center">
            {/* <h2>OnlineExam</h2> */}
            <span className="logo-lg">
              
              {/* <img src="static/assets/images/logo-sm.png" alt="" height="40" /> */}
              <span className="logo-lg-text-light">OnlineExam</span> 
            </span>
            <span className="logo-sm">
              {/* <span className="logo-sm-text-dark">U</span>  */}
              <img src="static/assets/logo/logo-sm.png" alt="" height="28px" />
            </span>
          </Link>
        </div>

        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
            <button
              className="buttonMenuMobile waves-effect waves-light"
              onClick={this.handleClickMenuButton}
            >
              <i className="fe-menu"></i>
            </button>
          </li>

          {/* <li className="dropdown d-none d-lg-block ">
            <div className="lang-option">
              <select
                className="selectpicker form-control"
                title=""
                data-width="110px"
              >
                <option> English </option>
                <option> French </option>
                <option> Germany </option>
                <option> Spanish</option>
              </select>
            </div>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default Topbar;