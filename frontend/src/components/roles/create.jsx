import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import Select from "react-select";
import MasterLayout from "../../layouts/MasterLayout";


class RolesCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      permissionsList: [],
      selectedOption: [],
      errors: {
        name: null,
        permissions: null,
      },
      btnDisable: false,
      newRoles: {
        id: null,
        name: "",
        permissions: [],
      },
      editing: false,
      title: "Add Roles",
      buttonValue: "Create",
    };
  }

  componentDidMount() {
    this.fetchPermissions();

    const { id } = this.props.match.params;
    if (id) {
      this.fetchRolesDetails(id);
      this.setState({
        title: "Update Roles",
        buttonValue: "Update",
        editing: true,
      });
    }
  }

  fetchPermissions = () => {
    let options = [];
    const url = "http://localhost:8000/api/permissions/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (!data.detail) {
          data.map((item, index) => {
            return options.push({
              value: item.id,
              label: item.name,
            });
          });
        }
      });

    this.setState({
      permissionsList: options,
    });
    // console.log(options);
  };

  fetchRolesDetails = (id) => {
    let url = `http://localhost:8000/api/groups/${id}/`;

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
          selectedOption: data.permissions.map((item, index) => { return {value: item.id, label: item.permissions} }),
          newRoles: data,
        })
      );
      
  };

  handleSubmit = (e) => {
    e.preventDefault(); // stop form-reload

    let message = "Roles Add Successful.";
    let className = "text-success";

    const { newRoles } = this.state;
    const { name } = this.state.newRoles;
    console.log(this.state.newRoles);
    if (name === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          name: "Roles Must not be empty.",
        },
      });
      return false;
    }

    let url = `http://localhost:8000/api/groups/`;
    let method = "POST";

    if (this.state.editing === true) {
      url = `http://localhost:8000/api/groups/${newRoles.id}/`;
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
      body: JSON.stringify(newRoles),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            newRoles: {
              id: null,
              name: "",
              permissions: [],
            },
            selectedOption: [{ value: 0, label: null }],
            errors: {
              name: null,
              question: null,
            },
          });

          if (method === "PUT") {
            message = "Roles Updated Successful.";
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
  handleSelectOptionChange = (selectedOption) => {
    let permissions_id = [];

    if(selectedOption){
      selectedOption.map((item, index) => {
        return permissions_id.push(
          item.value,
        );
      });
    }

    this.setState({
      selectedOption: selectedOption,
      newRoles: {
        ...this.state.newRoles,
        permissions: permissions_id,
      },
      errors: {
        permissions: [],
      },
    });
    console.log(permissions_id);

  };

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      newRoles: {
        ...this.state.newRoles,
        [id]: value,
      },
      errors: {
        ...this.state.errors,
        [id]: null,
      },
    });
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    if (this.state.redirect) {
      return <Redirect push to="/roles" />;
    }
    let { selectedOption } = this.state;
    let { newRoles } = this.state;
    
    let permissions = this.state.permissionsList;

    const { name } = this.state.errors;
    return (
      <div className="RolesCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/roles">
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
                            htmlFor="name"
                          >
                            Name
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control input-sm"
                              data-toggle="input-mask"
                              data-mask-format="Name"
                              value={newRoles.name}
                              onChange={this.handleInputChange}
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {name ? name : ""}
                            </span>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="example-input-merchant"
                          >
                            Permissions
                          </label>
                          <div className="col-md-9">
                            <Select
                              onChange={this.handleSelectOptionChange}
                              value={selectedOption}
                              options={permissions}
                              isMulti={true}
                              placeholder="Enter permissions"
                            />
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

export default RolesCreate;