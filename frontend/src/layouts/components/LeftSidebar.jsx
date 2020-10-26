import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftSidebar extends Component {
  render() {
    return (
      <div className="LeftSidebar">
        <div className="left-side-menu">
          <div className="slimscroll-menu">
            <div id="sidebar-menu">
              
            {localStorage.getItem("is_superuser") == "true" ? 

              <ul className="metismenu" id="side-menu">
                {/* <li className="menu-title">Navigation</li> */}

                <li>
                  <Link to="/dashboard">
                    <i className="fe-airplay"></i>
                    {/* <span className="badge badge-success badge-pill float-right">
                      1
                    </span> */}
                    <span> Dashboard </span>
                  </Link>
                </li>

                <hr style={{ borderTopColor: "#f3f3f3" }} />
                
                <li>
                  <Link to="/question">
                    <i className="fe-pie-chart"></i>
                    <span> Question </span>
                  </Link>
                </li>
                <li>
                  <Link to="/subject">
                    <i className="fe-pie-chart"></i>
                    <span> Subjects </span>
                  </Link>
                </li>
                <li>
                  <Link to="/examination">
                    <i className="fe-pie-chart"></i>
                    <span> Examination </span>
                  </Link>
                </li>

                <hr style={{ borderTopColor: "#f3f3f3" }} />
                <li>
                  <Link to="/assign-question">
                    <i className="fe-pie-chart"></i>
                    <span> Question Assign </span>
                  </Link>
                </li>
                  
                <li>
                  <Link to="/roles">
                    <i className="fe-pie-chart"></i>
                    <span> Roles </span>
                  </Link>
                </li>
                <hr style={{ borderTopColor: "#f3f3f3" }} />
              </ul>
   : <ul className="metismenu" id="side-menu">
   {/* <li className="menu-title">Navigation</li> */}

   <li>
     <Link to="/dashboard">
       <i className="fe-airplay"></i>
       {/* <span className="badge badge-success badge-pill float-right">
         1
       </span> */}
       <span> Dashboard </span>
     </Link>
   </li>

   <hr style={{ borderTopColor: "#f3f3f3" }} />
                <li>
                  <Link to="/start-examination">
                    <i className="fe-pie-chart"></i>
                    <span> Start Examination </span>
                  </Link>
                </li>
                

                <hr style={{ borderTopColor: "#f3f3f3" }} />
              </ul>
              }
            </div>

            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;