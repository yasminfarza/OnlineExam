import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //     password: "",
  //     incorrectData: "",
  //     redirect: false,
  //   };
  // }

  render() {
    return (
      <div className="notFound">
        <div className="account-pages my-5 pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div>
                  <div className="text-center">
                    <h2 className="text-uppercase text-primary mt-4">
                      Page Not Found
                    </h2>
                    <p className="text-muted mt-4 ">
                      It's looking like you may have taken a wrong turn. Don't
                      worry... it happens to the best of us. You might want to
                      check your internet connection. Here's a little tip that
                      might help you get back on track.
                    </p>

                    <Link
                      to="/home"
                      className="btn btn-primary waves-effect waves-light mt-4"
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
