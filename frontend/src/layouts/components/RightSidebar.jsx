import React, { Component } from "react";

class RightSidebar extends Component {
  render() {
    return (
      <div className="RightSidebar">
        <div className="right-bar">
          <div className="rightbar-title">
            <a href="#!" className="right-bar-toggle float-right">
              <i className="mdi mdi-close"></i>
            </a>
            <h5 className="m-0 text-white">Settings</h5>
          </div>
          <div className="slimscroll-menu">
            <hr className="mt-0" />
            <h5 className="pl-3">Basic Settings</h5>
            <hr className="mb-0" />
            <div className="p-3">
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  checked
                />
                <label className="custom-control-label" for="customCheck1">
                  Notifications
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck2"
                  checked
                />
                <label className="custom-control-label" for="customCheck2">
                  API Access
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck3"
                />
                <label className="custom-control-label" for="customCheck3">
                  Auto Updates
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck4"
                  checked
                />
                <label className="custom-control-label" for="customCheck4">
                  Online Status
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck5"
                />
                <label className="custom-control-label" for="customCheck5">
                  Auto Payout
                </label>
              </div>
            </div>

            <hr className="mt-0" />
            <h5 className="pl-3 pr-3">Timeline</h5>
            <hr className="mb-0" />

            <div className="p-3">
              <ul className="list-unstyled activity-widget">
                <li className="activity-list">
                  <p className="mb-0">
                    <small>08 July</small>
                  </p>
                  <p>Neque porro quisquam est</p>
                </li>
                <li className="activity-list">
                  <p className="mb-0">
                    <small>09 July</small>
                  </p>
                  <p>Ut enim ad minima veniam quis velit esse </p>
                </li>
                <li className="activity-list">
                  <p className="mb-0">
                    <small>10 July</small>
                  </p>
                  <p>Quis autem vel eum iure</p>
                </li>
              </ul>
            </div>

            <hr className="mt-0" />
            <h5 className="pl-3 pr-3">
              Messages{" "}
              <span className="float-right badge badge-pill badge-danger">
                24
              </span>
            </h5>
            <hr className="mb-0" />
            <div className="p-3">
              <div className="inbox-widget">
                <div className="inbox-item">
                  <div className="inbox-item-img">
                    <img
                      src="assets/images/users/avatar-1.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p className="inbox-item-author">
                    <a href="#!">Chadengle</a>
                  </p>
                  <p className="inbox-item-text">Hey! there I'm available...</p>
                  <p className="inbox-item-date">13:40 PM</p>
                </div>
                <div className="inbox-item">
                  <div className="inbox-item-img">
                    <img
                      src="assets/images/users/avatar-2.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p className="inbox-item-author">
                    <a href="#!">Tomaslau</a>
                  </p>
                  <p className="inbox-item-text">
                    I've finished it! See you so...
                  </p>
                  <p className="inbox-item-date">13:34 PM</p>
                </div>
                <div className="inbox-item">
                  <div className="inbox-item-img">
                    <img
                      src="assets/images/users/avatar-3.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p className="inbox-item-author">
                    <a href="#!">Stillnotdavid</a>
                  </p>
                  <p className="inbox-item-text">This theme is awesome!</p>
                  <p className="inbox-item-date">13:17 PM</p>
                </div>

                <div className="inbox-item">
                  <div className="inbox-item-img">
                    <img
                      src="assets/images/users/avatar-4.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p className="inbox-item-author">
                    <a href="#!">Kurafire</a>
                  </p>
                  <p className="inbox-item-text">Nice to meet you</p>
                  <p className="inbox-item-date">12:20 PM</p>
                </div>
                <div className="inbox-item">
                  <div className="inbox-item-img">
                    <img
                      src="assets/images/users/avatar-5.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <p className="inbox-item-author">
                    <a href="#!">Shahedk</a>
                  </p>
                  <p className="inbox-item-text">Hey! there I'm available...</p>
                  <p className="inbox-item-date">10:15 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rightbar-overlay"></div>
      </div>
    );
  }
}

export default RightSidebar;