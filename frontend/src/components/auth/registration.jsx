import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import loginData from "./../common/functions";
import Select from "react-select";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      username: "",
      roles: "",
      email: "",
      password: "",
      cpassword: "",
      errors: {
        username: "",
        email: "",
        password: "",
        passwordsMatch: "",
      },
      redirect: false,
    };
  }
  
  handleRegistration = (e) => {
    e.preventDefault(); // stop form-reload
    const username = this.state.username;
    // const roles = this.state.roles;
    const email = this.state.email;
    const password = this.state.password;

    if (username === "") {
      this.setState({ errors: { username: "Username must be required" } });
      return false;
    } else if (email === "") {
      this.setState({ errors: { email: "Email must be required" } });
      return false;
    } else if (password === "") {
      this.setState({ errors: { password: "Password must be required" } });
      return false;
    }
    // console.log("username & password: ", username, password);

    const url = `http://localhost:8000/api/auth/register`;

    loginData(url, {
      username: username,
      email: email,
      password: password,
    }).then((data) => {
      if (!data.token) {
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        this.setState({
          errors: {
            email: data.email ? data["email"][0] : "",
            username: data.username ? data["username"][0] : "",
          },
        });
      } else {
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", true);
        this.setState({
          redirect: true,
          errors: {
            username: "",
            email: "",
          },
        });
      }
    });
  };

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      [id]: value,
      errors: {
        [id]: "",
      },
    });
  };

  passwordsMatch = () => {
    const cpassword = this.state.cpassword;
    const password = this.state.password;
    let msg = "";
    if (cpassword !== password) {
      msg = "Passwords do not match";
    } else {
      msg = "";
    }

    this.setState({ errors: { passwordsMatch: msg } });
  };


  componentDidMount() {
    this.fetchRole();
  };


  fetchRole = () => {
    console.log(this.state.token);
    let options = [];
    const url = `http://localhost:8000/api/groups/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.detail) {
          data.map((item) => {
            return options.push({
              value: item.id,
              label: item.set,
            });
          });
        }
      });
      
      this.setState({
        roleList: options,
      });
  };

  handleRoleOptionChange = (selectedRole) => {
    this.fetchRole();
    console.log("work");
    this.setState({
      selectedRole: selectedRole,
      username: this.state.username,
      roles: selectedRole.value,
      email: this.state.email,
      password: this.state.password,
      cpassword: this.state.cpassword,
      errors: {
        roles: [],
      },
    });

  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/dashboard" />;
    }
   return (
      <div className="Registration">
        <div className="home-btn d-none d-sm-block">
          <a href="#!">
            <i className="fas fa-home h2"></i>
          </a>
        </div>
        <div className="account-pages my-5">
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
                          height="60"
                        />
                      </span> */}
                    </a>
                  </div>

                  <form onSubmit={this.handleRegistration}>
                    <div className="form-group mb-3">
                      <label htmlFor="username">Username</label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={this.state.username}
                        required={true}
                        placeholder="Enter your username"
                        onChange={this.handleInputChange}
                      />
                      <span className="text-center text-danger">
                        {this.state.errors.username}
                      </span>
                    </div>
                    {/* <div className="form-group mb-3">
                      <label htmlFor="roles">Role</label>
                      <Select onChange={this.handleRoleOptionChange}
                              value={selectedRole}
                              options={roles}
                              placeholder="Enter role"
                            />
                      <span className="text-center text-danger">
                        {this.state.errors.roles}
                      </span>
                    </div> */}
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        required={true}
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                      <span className="text-center text-danger">
                        {this.state.errors.email}
                      </span>
                    </div>
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
                      <span className="text-center text-danger">
                        {this.state.errors.password}
                      </span>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="cpassword">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required={true}
                        id="cpassword"
                        placeholder="Enter your confirm password"
                        value={this.state.cpassword}
                        onKeyUp={this.passwordsMatch}
                        onChange={this.handleInputChange}
                      />
                      <span className="text-center text-danger">
                        {this.state.errors.passwordsMatch}
                      </span>
                    </div>
                    {/* <div className="form-group mb-4">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkbox-signup"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkbox-signup"
                        >
                          I accept &nbsp;
                          <span className="text-primary">
                            Terms and Conditions
                          </span>
                        </label>
                      </div>
                    </div> */}

                    <div className="form-group mb-3 text-center">
                      <button
                        className="btn btn-primary btn-lg width-lg btn-rounded"
                        type="submit"
                      >
                        Sign Up Free
                      </button>
                    </div>
                  </form>
                </div>

                <div className="row">
                  <div className="col-sm-12 text-center">
                    <p className="text-muted">
                      Already have an account?
                      <span className="text-dark ml-1">
                        <Link to={"/sign-in"}> Sign In </Link>
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

export default Registration;
