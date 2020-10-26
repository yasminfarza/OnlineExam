import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { notify } from "./../common/functions";

import Select from "react-select";
import MasterLayout from "../../layouts/MasterLayout";


class EnrollCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      redirect: false,
      ques_set: [],
      btnDisable: false,
      editing: false,
      title: "",
      subject: "",
      set: "",
      answers: [],
      buttonValue: "Submit",
      newAssign:{
        user_id: '',
        answers_sheet: [],
      }
    };
    
  }

  fetchQuesPaper = () => {
    let options = [];
    const user_id = localStorage.getItem("id");
    
    const url = `http://localhost:8000/api/start-examination/${user_id}/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {        
        this.setState({
          title: data[0].examination,
          subject: data[0].subject,
          set: data[0].set,
          ques_set: data[0].ques_set,
        });
      });
      
          
  };

  componentDidMount() {
    this.fetchQuesPaper();
  }

  handleSubmit = (e) => {
    e.preventDefault(); // stop form-reload

    let message = "Question submit done.";
    let className = "text-success";

    let url = `http://localhost:8000/api/answer/`;
    let method = "POST";

    let inputValue = [{
      user_id: localStorage.getItem("id"),
      answers_sheet: this.state.answers,
    }]

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
            newAssign: {
              user_id: localStorage.getItem("id"),
              answers_sheet: this.state.answers,
            },
          });
          
          notify(message, className);
        }
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  };

  handleCheckboxChange = (event) => {
    if (event.target.checked) {
      if (!this.state.answers.includes(event.target.value)) {
        this.setState(prevState => ({ answers: [...prevState.answers, event.target.value]}))
      }
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect push to="/sign-in" />;
    }
    if (this.state.redirect) {
      return <Redirect push to="/start-examination" />;
    }
    let { title, subject, set, ques_set, } = this.state;
    console.log(this.state.answers);
    var self = this;
    
    return (
      <div className="EnrollCreate">
        <MasterLayout>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-12">
                    <div className="d-flex justify-content-center">
                      <h4>{title}</h4>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h5>Subject: {subject}</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h5>SET: {set}</h5>
                    </div>
                    <hr/>

                      <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="question">
                        {ques_set ? (
                          ques_set.map(function (sub, i) {
                            return (
                              <div key={i}>
                                <p> {i+1}. {sub.question}</p>
                                <ol>
                                {
                                  sub.options.map(function (option, j){
                                  return (
                                    <div className="col-md-3 form-check" key={j}>
                                      <input type="checkbox" className="form-check-input" id={option.option_id}
                                      name="is_answer" value={option.option_id} onChange={self.handleCheckboxChange}/>
                                      <label className="form-check-label" htmlFor={option.option_id}>{option.option}</label>
                                    </div>
                                  )
                                  })
                                }
                                </ol>
                              </div>
                            )})) : (
                              <p>No Exam Paper Found</p>  
                            )}
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

export default EnrollCreate;