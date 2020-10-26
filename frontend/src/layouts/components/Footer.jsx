import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      // Footer Start
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              2020 &copy; A Product by <a href="/">anfa</a>
            </div>
            <div className="col-md-6">
              <div className="text-md-right footer-links d-none d-sm-block">
              </div>
            </div>
          </div>
        </div>
      </footer>
      // end Footer
    );
  }
}

export default Footer;