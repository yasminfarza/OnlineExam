import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import MasterLayout from "../../layouts/MasterLayout";

class Assign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      assignList: [],
    };
  }

  componentDidMount() {
    this.fetchAssign();
  }

  fetchAssign = () => {
    let url = "http://localhost:8000/api/assign/";
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
          assignList: data,
        })
      );
  };

  startDelete = (assign) => {
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
        fetch(`http://localhost:8000/api/assign/${assign.id}/`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Assign),
        })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            this.fetchAssign();
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
    let assign = this.state.assignList;
    console.log(assign);
    let self = this;
    return (
      <div className="Assign">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/assign-create">
                    <button className="btn btn-info">Create</button>
                  </Link>
                </div>
                <h4 className="page-title">Assign Question</h4>
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
                              <th>#SL</th>
                              <th>User</th>
                              <th data-priority="1">Examination</th>
                              <th data-priority="1">Set</th>
                              <th data-priority="6">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assign ? (
                              assign.map(function (item, index) {
                                return (
                                  <tr key={index}>
                                     <th>
                                      {index + 1}
                                    </th>
                                    <th>
                                      {item.user[0].username}
                                    </th>
                                    <th>
                                      {item.examination[0].exam}
                                    </th>
                                    <th>
                                      SET {item.set[0].set_value}
                                    </th>
                                    <td>
                                      <Link to={`/assign-question/edit/${item.id}`}>
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

export default Assign;