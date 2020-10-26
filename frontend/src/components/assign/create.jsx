import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import Select from "react-select";
import MasterLayout from "../../layouts/MasterLayout";


class AssignCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      userList: [],
      examList: [],
      setList: [],
      selectedUser: null,
      selectedExam: null,
      selectedSet: null,
      errors: {
        user: 0,
        examination: 0,
        set: 0,
      },
      btnDisable: false,
      newAssign: {
        id: null,
        user: 0,
        examination: 0,
        set: 0,
      },
      editing: false,
      title: "Assign Question",
      buttonValue: "Create",
    };
  }

  fetchUser = () => {
    let options = [];
    const url = "http://localhost:8000/api/user-component/";
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
              label: item.username,
            });
          });
        }
      });
      
      this.setState({
        userList: options,
      });
  };

  fetchSet = (examination) => {
    let options = [];
    const url = `http://localhost:8000/api/examination-set-component/${examination}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log("exam", data);
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
        setList: options,
      });
  };

  fetchExam = () => {
    let options = [];
    const url = "http://localhost:8000/api/examination/";
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
              label: item.title,
            });
          });
        }
      });
      
      this.setState({
        examList: options,
      });    
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchExam();

    const { id } = this.props.match.params;
    if (id) {
      this.fetchAssignDetails(id);
      this.setState({
        title: "Change assigned question",
        buttonValue: "Update",
        editing: true,
      });
    }
  }

  fetchAssignDetails = (id) => {
    let url = `http://localhost:8000/api/assign/${id}/`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          selectedUser: data.user.map((item) => { return {value: item.id, label: item.username} }),
          selectedExam: data.examination.map((item) => { return {value: item.id, label: item.exam} }),
          selectedSet: data.set.map((item) => { return {value: item.id, label: item.set_value} }),
          newAssign: {
            id: data.id,
            user: data.user[0].id,
            examination: data.examination[0].id,
            set: data.set[0].id,
          },
        })
      );
      
  };

  handleSubmit = (e) => {
    e.preventDefault(); // stop form-reload

    let message = "Examination question assigned successful.";
    let className = "text-success";

    const { newAssign } = this.state;
    const { user, examination, set } = this.state.newAssign;
    if (user === 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          name: "User must not be empty.",
        },
      });
      return false;
    }


    if (examination === 0) {
      this.setState({
        errors: {
          ...this.errors,
          question: "Examination must not be empty.",
        },
      });
      return false;
    }

    if (set === 0) {
      this.setState({
        errors: {
          ...this.errors,
          question: "Set must not be empty.",
        },
      });
      return false;
    }


    let url = `http://localhost:8000/api/assign/`;
    let method = "POST";

    if (this.state.editing === true) {
      url = `http://localhost:8000/api/assign/${newAssign.id}/`;
      method = "PUT";
      this.setState({
        editing: false,
      });
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
      body: JSON.stringify(newAssign),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            newAssign: {
              id: null,
              user: 0,
              examination: 0,
              set: 0,
            },
            selectedUser: [{ value: 0, label: null }],
            selectedExam: [{ value: 0, label: null }],
            selectedSet: [{ value: 0, label: null }],
            errors: {
              name: null,
              question: null,
            },
          });

          if (method === "PUT") {
            message = "Updated Successful.";
            className = "text-success";
            notify(message, className);

            this.setState({
              redirect: true,
            });
          } else {
            notify(message, className);
          }
        }
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  /*
  helper function 
  */
  // Select option on change action
  handleExamOptionChange = (selectedExam) => {
    this.fetchSet(selectedExam.value);
    
    this.setState({
      selectedExam: selectedExam,
      newAssign: {
        ...this.state.newAssign,
        examination: selectedExam.value,
      },
      errors: {
        examination: [],
      },
    });

  };

  handleUserOptionChange = (selectedUser) => {
    this.fetchSet(selectedUser.value);
    
    this.setState({
      selectedUser: selectedUser,
      newAssign: {
        ...this.state.newAssign,
        user: selectedUser.value,
      },
      errors: {
        user: [],
      },
    });

  };

  handleSetOptionChange = (selectedSet) => {
    this.fetchSet(selectedSet.value);
    
    this.setState({
      selectedSet: selectedSet,
      newAssign: {
        ...this.state.newAssign,
        set: selectedSet.value,
      },
      errors: {
        set: [],
      },
    });

  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    if (this.state.redirect) {
      return <Redirect push to="/assign-question" />;
    }
    let { selectedUser, selectedExam, selectedSet } = this.state;
    let { newAssign } = this.state;
    let users = this.state.userList;
    let exams = this.state.examList;
    let sets = this.state.setList;

    const { user, examination, set } = this.state.errors;
    return (
      <div className="AssignCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/assign-question">
                    <button className="btn btn-info">List</button>
                  </Link>
                </div>
                <h4 className="page-title">{this.state.title}</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      {/* <h4 className="header-title">
                      Questions Based Add Your Subject
                    </h4> */}
                      <p className="sub-header">
                      All <code>(*) </code>is mandatory filed.
                      </p>

                      <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="user"
                          >
                            User
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <Select
                              onChange={this.handleUserOptionChange}
                              value={selectedUser}
                              options={users}
                              placeholder="Enter User"
                            />
                            <span className="font-12 text-danger">
                              {user ? user : ""}
                            </span>
                          </div>
                        </div>   

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="examination"
                          >
                            Examination
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <Select
                              onChange={this.handleExamOptionChange}
                              value={selectedExam}
                              options={exams}
                              placeholder="Enter Examination"
                            />
                            <span className="font-12 text-danger">
                              {examination ? examination : ""}
                            </span>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="set"
                          >
                            Question Set
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <Select
                              onChange={this.handleSetOptionChange}
                              value={selectedSet}
                              options={sets}
                              placeholder="Enter set"
                            />
                            <span className="font-12 text-danger">
                              {set ? set : ""}
                            </span>
                          </div>
                        </div>   

                        <div className="text-right">
                          <button
                            type="submit"
                            className="btn btn-info waves-effect waves-light mt-3"
                            disabled={this.state.btnDisable}
                          >
                            {this.state.buttonValue}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MasterLayout>
      </div>
    );
  }
}

export default AssignCreate;