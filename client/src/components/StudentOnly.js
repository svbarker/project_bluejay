import React from "react";

const StudentOnly = props => {
  if (props.userKind === "Student") {
    return props.children;
  } else {
    return null;
  }
};

export default StudentOnly;
