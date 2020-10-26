import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import Select from "react-select";
import MasterLayout from "../../layouts/MasterLayout";


class ExaminationCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      subjectList: [],
      selectedOption: null,
      errors: {
        title: null,
        subject: null,
        total_questions: 0,
        total_set: 0,
      },
      btnDisable: false,
      newExamination: {
        id: null,
        title: "",
        subject: 0,
        total_questions: 0,
        total_set: 0,
      },
      editing: false,
      title: "Add Examination",
      buttonValue: "Create",
    };
  }

  componentDidMount() {
    this.fetchSubject();

    const { id } = this.props.match.params;
    if (id) {
      this.fetchExamDetails(id);
      this.setState({
        title: "Update Examination",
        buttonValue: "Update",
        editing: true,
      });
    }
  }

  fetchSubject = () => {
    let options = [];
    const url = "http://localhost:8000/api/subject/";
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
          data.map((item, index) => {
            return options.push({
              value: item.id,
              label: item.name,
            });
          });
        }
      });

    this.setState({
      subjectList: options,
    });
  };

  fetchExamDetails = (id) => {
    
    let url = `http://localhost:8000/api/examination/${id}/`;
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
          newExamination: {
            id: data.id,
            title: data.title,
            subject: data.subject[0].id,
            total_questions: data.total_questions,
            total_set: data.total_set,
          },
          selectedOption: data.subject.map((item) => { return {value: item.id, label: item.name} }),
        })
      );
  };

  handleSubmit = (e) => {
    e.preventDefault(); // stop form-reload

    let message = "Examination Add Successful.";
    let className = "text-success";

    const { newExamination } = this.state;
    console.log("data", newExamination);
    const { title, subject, total_questions, total_set } = this.state.newExamination;
    if (title === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          name: "Title must not be empty.",
        },
      });
      return false;
    }


    if (subject === 0) {
      this.setState({
        errors: {
          ...this.errors,
          examination: "Subject must not be empty.",
        },
      });
      return false;
    }

    if (total_questions === 0) {
      this.setState({
        errors: {
          ...this.errors,
          examination: "Total questions field must not be empty.",
        },
      });
      return false;
    }

    if (total_set === 0) {
      this.setState({
        errors: {
          ...this.errors,
          examination: "Total set field must not be empty.",
        },
      });
      return false;
    }


    let url = `http://localhost:8000/api/examination/`;
    let method = "POST";

    if (this.state.editing === true) {
      url = `http://localhost:8000/api/examination/${newExamination.id}/`;
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
      body: JSON.stringify(newExamination),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            newExamination: {
              id: null,
              title: "",
              subject: 0,
              total_questions: 0,
              total_set: 0,
            },
            selectedOption: { value: 0, label: null },
            errors: {
              title: null,
              subject: null,
              total_questions: 0,
              total_set: 0,
            },
          });

          if (method === "PUT") {
            message = "Examination Updated Successful.";
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

  handleSelectOptionChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
      newExamination: {
        ...this.state.newExamination,
        subject: selectedOption.value,
      },
      errors: {
        subject: null,
      },
    });
  };

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      newExamination: {
        ...this.state.newExamination,
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
      return <Redirect push to="/examination" />;
    }
    let { selectedOption } = this.state;
    let { newExamination } = this.state;
    let subjects = this.state.subjectList;
    console.log(newExamination);
    const { title, subject, total_questions, total_set } = this.state.errors;
    return (
      <div className="ExaminationCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/examination">
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
                      examinations Based Add Your examination
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
                            htmlFor="title"
                          >
                            Title
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="form-control input-sm"
                              data-toggle="input-mask"
                              data-mask-format="Title"
                              value={newExamination.title}
                              onChange={this.handleInputChange}
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {title ? title : ""}
                            </span>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="subject"
                          >
                            Subject
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                          <Select
                              onChange={this.handleSelectOptionChange}
                              value={selectedOption}
                              options={subjects}
                              placeholder="Enter Subject"
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {subject ? subject : ""}
                            </span>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="total_questions"
                          >
                            Total Questions
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="total_questions"
                              id="total_questions"
                              className="form-control input-sm"
                              data-toggle="input-mask"
                              data-mask-format="Total Questions"
                              value={newExamination.total_questions}
                              onChange={this.handleInputChange}
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {total_questions ? total_questions : ""}
                            </span>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="total_set"
                          >
                            Total Set
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="total_set"
                              id="total_set"
                              className="form-control input-sm"
                              data-toggle="input-mask"
                              data-mask-format="total_set"
                              value={newExamination.total_set}
                              onChange={this.handleInputChange}
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {total_set ? total_set : ""}
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

export default ExaminationCreate;