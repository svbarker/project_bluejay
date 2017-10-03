import React from "react";
import Card from "material-ui/Card";
// import { ListItem } from "material-ui/List";

const Task = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};
