import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import MasterLayout from "../../layouts/MasterLayout";

class QuestionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      errors: {
        question: null,
        option_1: null,
        option_2: null,
        option_3: null,
        option_4: null,
        option_5: null,
      },
      btnDisable: false,
      newQuestion: {
        id: null,
        question: "",
        option_1: "",
        is_answer_1: 0,
        option_2: "",
        is_answer_2: 0,
        option_3: "",
        is_answer_3: 0,
        option_4: "",
        is_answer_4: 0,
        option_5: "",
        is_answer_5: 0,
      },
      editing: false,
      title: "Create Question",
      buttonValue: "Create",
    };
  }
  
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.fetchQuestionDetails(id);
      this.setState({
        title: "Update Question",
        buttonValue: "Update",
        editing: true,
      });
    }
  }

  fetchQuestionDetails = (id) => {
    let url = `http://localhost:8000/api/question/${id}/`;
    let result = []; 
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
          newQuestion: {
            id: data.id,
            question: data.question,
            option_1: data.option_set[0].option,
            is_answer_1: data.option_set[0].is_answer,
            option_2: data.option_set[1].option,
            is_answer_2: data.option_set[1].is_answer,
            option_3: data.option_set[2].option,
            is_answer_3: data.option_set[2].is_answer,
            option_4: data.option_set[3].option,
            is_answer_4: data.option_set[3].is_answer,
            option_5: data.option_set[4].option,
            is_answer_5: data.option_set[4].is_answer,
          },
        })
      );
      // console.log("result", result);
  };


  handleSubmit = (e) => {
    e.preventDefault();
    let message = "Question Add Successful.";
    let className = "text-success";
    

    const { newQuestion } = this.state;

    let  inputValue = {
      question: this.state.newQuestion.question,
      option_set: [
        {
          option: this.state.newQuestion.option_1,
          is_answer: this.state.newQuestion.is_answer_1,
        },
        {
          option: this.state.newQuestion.option_2,
          is_answer: this.state.newQuestion.is_answer_2,
        },
        {
          option: this.state.newQuestion.option_3,
          is_answer: this.state.newQuestion.is_answer_3,
        },
        {
          option: this.state.newQuestion.option_4,
          is_answer: this.state.newQuestion.is_answer_4,
        },
        {
          option: this.state.newQuestion.option_5,
          is_answer: this.state.newQuestion.is_answer_5,
        },
    ],
    };
    // console.log("newQuestionsCheck", newQuestion);
    // console.log("inputValueCheck", inputValue);
    // return;
    const { question, option_1, option_2, option_3, 
      option_4, option_5} = this.state.newQuestion;

    if (question === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          question: "Question must not be empty.",
        },
      });
      return false;
    }

    if (option_1 === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          option_1: "Option 1 must not be empty.",
        },
      });
      return false;
    }

    if (option_2 === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          option_2: "Option 2 must not be empty.",
        },
      });
      return false;
    }

    if (option_3 === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          option_3: "Option 3 must not be empty.",
        },
      });
      return false;
    }

    if (option_4 === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          option_4: "Option 4 must not be empty.",
        },
      });
      return false;
    }

    if (option_5 === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          option_5: "Option 5 must not be empty.",
        },
      });
      return false;
    }

    let url = `http://localhost:8000/api/question/`;
    let method = "POST";
    console.log("edit", this.state.editing);
    if (this.state.editing === true) {
      url = `http://localhost:8000/api/question/${newQuestion.id}/`;
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
      body: JSON.stringify(inputValue),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            newQuestion: {
              id: null,
              question: "",
              option_1: "",
              is_answer_1: 0,
              option_2: "",
              is_answer_2: 0,
              option_3: "",
              is_answer_3: 0,
              option_4: "",
              is_answer_4: 0,
              option_5: "",
              is_answer_5: 0,
            },
            errors: {
              question: null,
              option_1: null,
              option_2: null,
              option_3: null,
              option_4: null,
              option_5: null,
            },
          });

          if (method === "PUT") {
            message = "Question Updated Successful.";
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

  handleInputChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    this.setState({
      newQuestion: {
        ...this.state.newQuestion,
        [id]: value,
      },
      errors: {
        ...this.state.errors,
        [id]: null,
      },
    });
  };

  handleInputCheck = (e) => {
    let id = e.target.id;

    let answer = this.state.newQuestion[id];

    if(answer == 1){
      answer =  0;
    }else{
      answer = 1;
    }

    this.setState({
      newQuestion: {
        ...this.state.newQuestion,
        [id]: answer,
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
      return <Redirect push to="/question" />;
    }
    let { newQuestion } = this.state;
    const { question, option_1, option_2, option_3, option_4, option_5 } = this.state.errors;
    
    return (
      <div className="QuestionCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/question">
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
                      <p className="sub-header">
                      All <code>(*) </code>is mandatory field.
                      </p>

                      <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="question"
                          >
                            Question
                            <code>*</code>
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="question"
                              id="question"
                              className="form-control input-sm"
                              value={newQuestion.question}
                              onChange={this.handleInputChange}
                            />
                            <br />
                            <span className="font-12 text-danger">
                              {question ? question : ""}
                            </span>
                          </div>
                        </div>
                        
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="option_1"
                          >
                            Option 1
                            <code>*</code>
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="option_1"
                              name="option_1"
                              value={newQuestion.option_1}
                              className="form-control input-sm"
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-danger">
                              {option_1 ? option_1 : ""}
                            </span>
                          </div>
                          <div className="col-md-3 form-check">
                            <input type="checkbox" className="form-check-input" id="is_answer_1" 
                            name="is_answer_1" onChange={this.handleInputCheck} checked={newQuestion.is_answer_1} />
                            <label className="form-check-label" htmlFor="is_answer_1">Is Answer?</label>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="option_2"
                          >
                            Option 2
                            <code>*</code>
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="option_2"
                              name="option_2"
                              value={newQuestion.option_2}
                              className="form-control input-sm"
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-danger">
                              {option_2 ? option_2 : ""}
                            </span>
                          </div>
                          <div className="col-md-3 form-check">
                            <input type="checkbox" className="form-check-input" checked={newQuestion.is_answer_2 } onChange={this.handleInputCheck} id="is_answer_2" name="is_answer_2"/>
                            <label className="form-check-label" htmlFor="is_answer_2">Is Answer?</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="option_3"
                          >
                            Option 3
                            <code>*</code>
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="option_3"
                              name="option_3"
                              value={newQuestion.option_3}
                              className="form-control input-sm"
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-danger">
                              {option_3 ? option_3 : ""}
                            </span>
                          </div>
                          <div className="col-md-3 form-check">
                            <input type="checkbox" className="form-check-input" id="is_answer_3" name="is_answer_3" checked={newQuestion.is_answer_3} onChange={this.handleInputCheck}/>
                            <label className="form-check-label" htmlFor="is_answer_3">Is Answer?</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="option_4"
                          >
                            Option 4
                            <code>*</code>
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="option_4"
                              name="option_4"
                              value={newQuestion.option_4}
                              className="form-control input-sm"
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-danger">
                              {option_4 ? option_4 : ""}
                            </span>
                          </div>
                          <div className="col-md-3 form-check">
                            <input type="checkbox" className="form-check-input" id="is_answer_4" name="is_answer_4" checked={newQuestion.is_answer_4} onChange={this.handleInputCheck} />
                            <label className="form-check-label" htmlFor="is_answer_4">Is Answer?</label>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-md-3 col-form-label"
                            htmlFor="option_5"
                          >
                            Option 5
                            <code>*</code>
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="option_5"
                              name="option_5"
                              value={newQuestion.option_5}
                              className="form-control input-sm"
                              onChange={this.handleInputChange}
                            />
                            <span className="font-12 text-danger">
                              {option_5 ? option_5 : ""}
                            </span>
                          </div>
                          <div className="col-md-3 form-check">
                            <input type="checkbox" className="form-check-input" id="is_answer_5" name="is_answer_5" checked={newQuestion.is_answer_5} onChange={this.handleInputCheck} />
                            <label className="form-check-label" htmlFor="is_answer_5">Is Answer?</label>
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

export default QuestionCreate;