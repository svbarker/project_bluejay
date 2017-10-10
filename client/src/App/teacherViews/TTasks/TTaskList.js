import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TaskCard from "./TTaskCard";
import "./TTaskList.css";

//removed menucard container
//TODO: refactor this (Eric's) nonsense
const TaskList = props => {
  const { name, tasks, students, hydrateStudentList, deleteTask } = props;
  let taskCards;
  if (tasks.length) {
    //tasks aren't populated with student info
    //so insert pass the appropriate students down as props
    taskCards = tasks.map(task => {
      const studentsAssignedTask = task.students.map(studentId =>
        students.find(student => student._id === studentId)
      );
      return (
        <TaskCard
          unAssignAll={students => {
            props.unAssignAll(task, students);
          }}
          unAssignOne={student => {
            props.unAssignOne(task, student);
          }}
          deleteTask={() => props.deleteTask(task._id)}
          hydrateStudentList={() => hydrateStudentList(task)}
          students={studentsAssignedTask}
          key={task._id}
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
