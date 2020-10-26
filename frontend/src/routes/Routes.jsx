import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages Imported
import Dashboard from "./../components/dashboard/";
import Login from "./../components/auth/login";
import Registration from "./../components/auth/registration";
import Question from "../components/question";
import Subject from "../components/subject";
import Examination from "../components/examination";
import Roles from "../components/roles";
import Assign from "../components/assign";
import Enroll from "../components/enroll";

// Route definition
class Routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/sign-in" component={Login} />
                <Route exact path="/sign-up" component={Registration} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/question" component={Question.list} />
                <Route exact path="/question/edit/:id" component={Question.create} />
                <Route exact path="/question-create" component={Question.create} />
                <Route exact path="/subject" component={Subject.list} />
                <Route exact path="/subject-create" component={Subject.create} />
                <Route exact path="/subject/edit/:id" component={Subject.create} />
                <Route exact path="/examination" component={Examination.list} />
                <Route exact path="/examination-create" component={Examination.create} />
                <Route exact path="/examination/edit/:id" component={Examination.create} />

                {/* roles and permission */}
                
                <Route exact path="/roles" component={Roles.list} />
                <Route exact path="/roles-create" component={Roles.create} />
                <Route exact path="/roles/edit/:id" component={Roles.create} />

                <Route exact path="/assign-question" component={Assign.list} />
                <Route exact path="/assign-create" component={Assign.create} />
                <Route exact path="/assign-question/edit/:id" component={Assign.create} />

                <Route exact path="/start-examination" component={Enroll.create} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default Routes;