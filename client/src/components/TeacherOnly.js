import React from "react";

const TeacherOnly = props => {
  if (props.userKind === "Teacher") {
    return props.children;
  } else {
    return null;
  }
};

export default TeacherOnly;
