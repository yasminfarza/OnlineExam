import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import MasterLayout from "../../layouts/MasterLayout";

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      rolesList: [],
      offset: 0,
    };
  }

  componentDidMount() {
    this.fetchRoles();
  }

  fetchRoles = () => {
    let url = "http://localhost:8000/api/groups/";
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
          rolesList: data,
        })
      );
  };

  startDelete = (Roles) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: false, //"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {

        fetch(`http://localhost:8000/api/groups/${Roles.id}/`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Roles),
        })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            this.fetchRoles();
          })
          .catch(function (error) {
            console.log("ERROR: ", error);
          });
      }
    });
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    let roles = this.state.rolesList;
    let self = this;
    return (
      <div className="roles">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/roles-create">
                    <button className="btn btn-info">Add roles</button>
                  </Link>
                </div>
                <h4 className="page-title">Roles</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="responsive-table-plugin">
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive"
                        data-pattern="priority-columns"
                      >
                        <table
                          id="tech-companies-1"
                          className="table table-striped "
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              {/* <th data-priority="1">Permissions</th> */}
                              <th data-priority="6">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roles ? (
                              roles.map(function (item, index) {
                                return (
                                  <tr key={index}>
                                    <th>
                                      {item.name}
                                    </th>
                                    {/* <td> {
                                      item.questions.map((sub,i) => {
                                        return (
                                          <ul key={i}><li>{sub.question}</li></ul>
                                        )
                                      })
                                      } </td> */}
                                    <td>
                                      <Link to={`/roles/edit/${item.id}`}>
                                        <button className="btn btn-sm btn-info">
                                          <i className="fe-edit"></i>
                                        </button>
                                      </Link>
                                      &nbsp;
                                      <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                          self.startDelete(item);
                                        }}
                                      >
                                        <i className="fe-delete"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="3"
                                  className="text-center text-info"
                                >
                                  No Records Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
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

export default Roles;