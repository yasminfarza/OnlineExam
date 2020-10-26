import React from "react";

const PageContent = (props) => {
  return (
    <div className="PageContent">
      <div className="content">
        <div className="container-fluid">{props.children}</div>
      </div>
    </div>
  );
};

export default PageContent;