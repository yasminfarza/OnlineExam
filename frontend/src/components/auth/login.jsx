import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import loginData from "./../common/functions";
// import initialState from "./../common/functions";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      incorrectData: "",
      redirect: false,
    };
  }

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      [id]: value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault(); // stop form-reload
    const username = this.state.username;
    const password = this.state.password;
    // console.log("username & password: ", username, password);

    const url = `http://localhost:8000/api/auth/login`;

    loginData(url, {
      username: username,
      password: password,
    }).then((data) => {
      if (!data.non_field_errors) {
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("is_superuser", data.user.is_superuser);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", true);
        // initialState.isAuthenticated = true;
        this.setState({
          incorrectData: "",
          redirect: true,
        });
        // console.log(initialState.isAuthenticated);
      } else {
        // console.log("non_field_errors: ", data.non_field_errors[0]);
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        // initialState.isAuthenticated = false;
        this.setState({
          incorrectData: data.non_field_errors[0],
        });
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/dashboard" />;
    }
    return (
      <div className="Login">
        <div className="home-btn d-none d-sm-block">
          <a href="#!">
            <i className="fas fa-home h2"></i>
          </a>
        </div>
        <div className="account-pages my-5 pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-5 col-xl-4">
                <div>
                  <div className="text-center mb-4">
                    <a href="#!">
                      <h2 className="logo-lg-text-light">OnlineExam</h2>
                      {/* <span>
                        <img
                          src="static/assets/logo/logo-dark.png"
                          alt=""
                          height="30"
                          style={{ height: "60px" }}
                        />
                      </span> */}
                    </a>
                  </div>

                  <form onSubmit={this.handleLogin}>
                    <div className="form-group mb-3">
                      <label htmlFor="emailaddress">Username</label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        required={true}
                        placeholder="Enter your username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    {/* <Link className="text-muted float-right">
                      Forgot your password?
                    </Link> */}

                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required={true}
                        id="password"
                        placeholder="Enter your password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    {/* <div className="form-group mb-3">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkbox-signin"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkbox-signin"
                        >
                          Remember me
                        </label>
                      </div>
                    </div> */}
                    <div className="form-group mb-3 text-center">
                      <h5 className="text-danger">
                        {this.state.incorrectData}
                      </h5>
                    </div>
                    <div className="form-group text-center mb-3">
                      <button
                        className="btn btn-primary btn-lg width-lg btn-rounded"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>

                <div className="row">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">
                      Don't have an account?
                      <span className="text-dark ml-1">
                        <Link to={"/sign-up"}>Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
