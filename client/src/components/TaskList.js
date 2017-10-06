import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

//removed menucard container
//TODO: refactor this (Eric's) nonsense
const TaskList = ({ name, tasks, students, hydrateStudentList }) => {
  let taskCards;
  if (tasks.length) {
    //tasks aren't populated with student info
    //so insert pass the appropriate students down as props
    taskCards = tasks.map(task => {
      const studentsAssignedTask = task.students.map(studentId =>
        students.find(student => student._id === studentId)
      );
      // console.log("students of task = ", studentsAssignedTask);
      return (
        <TaskCard
          hydrateStudentList={() => hydrateStudentList(task)}
          students={studentsAssignedTask}
          task={task}
        />
      );
    });
  } else {
    taskCards = null;
  }

  return (
    <div className="task-container-outer">
      <Paper>
        <div className="task-container">
          <h2>{name}'s Tasks</h2>
          {taskCards}
        </div>
      </Paper>
    </div>
  );
};

export default TaskList;
