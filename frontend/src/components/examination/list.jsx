import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import MasterLayout from "../../layouts/MasterLayout";

class Examination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      examinationList: [],
      quesList: [],
    };
  }

  componentDidMount() {
    this.fetchExamination();
  }

  fetchExamination = () => {
    let url = "http://localhost:8000/api/examination/";
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
          examinationList: data,
        })
      );
  };

  startDelete = (examination) => {
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
        examination.delete_status = 1;

        fetch(`http://localhost:8000/api/examination/${examination.id}/`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(examination),
        })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            this.fetchExamination();
          })
          .catch(function (error) {
            console.log("ERROR: ", error);
          });
      }
    });
  };

  getQuestion = (set_id) => {
    let url = `http://localhost:8000/api/examination-set/${set_id}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        // console.log(data)
        this.setState({
          quesList: data,
        })
      );
  };

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    let examination = this.state.examinationList;
    let ques = this.state.quesList;
    let self = this;

    return (
      <div className="examination">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/examination-create">
                    <button className="btn btn-info">Create an examination</button>
                  </Link>
                </div>
                <h4 className="page-title">Examinations List</h4>
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
                              <th>SL</th>
                              <th>Examination</th>
                              <th data-priority="1">Subject</th>
                              <th data-priority="1">Total Question</th>
                              <th data-priority="1">Total Set</th>
                              <th data-priority="1">View Set</th>
                              <th data-priority="6">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examination ? (
                              examination.map(function (item, index) {
                                return (
                                  <tr key={index}>
                                    <th>{index + 1}</th>
                                    <th>
                                      {item.title}
                                    </th>
                                    <td> {item.subject[0].name}</td>
                                    <td> {item.total_questions}</td>
                                    <td> {item.total_set}</td>
                                    <td>
                                     <div className="modal" tabindex="-1" role="dialog" id="exampleModal">
                                        <div className="modal-dialog" role="document">
                                        {ques ? (
                                        ques.map(function (q) {
                                          return (
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title">SET {q.set}</h5>
                                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                              </button>
                                            </div>
                                            <div className="modal-body">
                                            {q.ques_set.map(function (sub, i) {
                                            return (
                                              <div key={i}>
                                                <p> {i+1}. {sub.question}</p>
                                                <ol type="A">
                                                {
                                                  sub.options.map(function (option){
                                                  return (
                                                    <li>{option.option}</li>
                                                  )
                                                  })
                                                }
                                                </ol>
                                              </div>
                                            )})}
                                            </div>
                                          </div>
                                          
                                          )
                                          })) : (
                                            <div className="modal-content"></div> 
                                          )}
                                        </div>
                                      </div>
                                      <div className="dropdown">
                                          <button className="btn btn-sm btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                            <i className="fe-eye"></i>
                                          </button>

                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                          item.examination_set.map((sub) => {
                                            return (
                                              <button type="button" className="dropdown-item" data-toggle="modal" data-target="#exampleModal" 
                                              onClick={() => {
                                                self.getQuestion(sub.id);
                                              }}>
                                                  SET {sub.set}
                                              </button>
                                                )
                                          })
                                        }
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <Link to={`/examination/edit/${item.id}`}>
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
                        <div>
                        </div>
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

export default Examination;