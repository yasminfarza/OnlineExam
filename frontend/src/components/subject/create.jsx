import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import Select from "react-select";
import MasterLayout from "../../layouts/MasterLayout";


class SubjectCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      questionsList: [],
      selectedOption: [],
      errors: {
        name: null,
        question: null,
      },
      btnDisable: false,
      newSubject: {
        id: null,
        name: "",
        questions: [],
      },
      editing: false,
      title: "Add Subject",
      buttonValue: "Create",
    };
  }

  componentDidMount() {
    this.fetchQuestions();

    const { id } = this.props.match.params;
    if (id) {
      this.fetchSubjectDetails(id);
      this.setState({
        title: "Update Subject",
        buttonValue: "Update",
        editing: true,
      });
    }
  }

  fetchQuestions = () => {
    let options = [];
    const url = "http://localhost:8000/api/question/";
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
              label: item.question,
            });
          });
        }
      });

    this.setState({
      questionsList: options,
    });
  };

  fetchSubjectDetails = (id) => {
    let url = `http://localhost:8000/api/subject/${id}/`;

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
          selectedOption: data.questions.map((item, index) => { return {value: item.id, label: item.question} }),
          newSubject: data,
        })
      );
      
  };

  handleSubmit = (e) => {
    e.preventDefault(); // stop form-reload

    let message = "Subject Add Successful.";
    let className = "text-success";

    const { newSubject } = this.state;
    const { name, question } = this.state.newSubject;
    if (name === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          name: "Subject Must not be empty.",
        },
      });
      return false;
    }


    if (question === 0) {
      this.setState({
        errors: {
          ...this.errors,
          question: "Question Must not be empty.",
        },
      });
      return false;
    }


    let url = `http://localhost:8000/api/subject/`;
    let method = "POST";

    if (this.state.editing === true) {
      url = `http://localhost:8000/api/subject/${newSubject.id}/`;
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
      body: JSON.stringify(newSubject),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            newSubject: {
              id: null,
              name: "",
              questions: [],
            },
            selectedOption: [{ value: 0, label: null }],
            errors: {
              name: null,
              question: null,
            },
          });

          if (method === "PUT") {
            message = "Subject Updated Successful.";
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
    let questions_id = [];

    if(selectedOption){
      selectedOption.map((item, index) => {
        return questions_id.push(
          item.value,
        );
      });
    }

    this.setState({
      selectedOption: selectedOption,
      newSubject: {
        ...this.state.newSubject,
        questions: questions_id,
      },
      errors: {
        questions: [],
      },
    });

  };

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      newSubject: {
        ...this.state.newSubject,
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
      return <Redirect push to="/subject" />;
    }
    let { selectedOption } = this.state;
    let { newSubject } = this.state;
    console.log(newSubject);
    let questions = this.state.questionsList;

    const { name, question } = this.state.errors;
    return (
      <div className="SubjectCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/subject">
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
                            Subject Name
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control input-sm"
                              data-toggle="input-mask"
                              data-mask-format="Subject Name"
                              value={newSubject.name}
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-muted">
                              <code>e.g "English"</code>
                            </span>
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
                            Questions
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <Select
                              onChange={this.handleSelectOptionChange}
                              value={selectedOption}
                              options={questions}
                              isMulti={true}
                              placeholder="Enter Questions"
                            />
                            <span className="font-12 text-danger">
                              {question ? question : ""}
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

export default SubjectCreate;