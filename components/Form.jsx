"use client";

import classes from "./Form.module.css";
import Card from "./ui/Card";
import { useState } from "react";

const Form = (props) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const taskChangeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (enteredTask.trim().length === 0) {
      setMessage("Task can't be EMPTY");
      return;
    }
    setIsLoading(true);
    setEnteredTask("");
    console.log(enteredTask);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({task:enteredTask}),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    setIsLoading(false)
    props.onFetch()

    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };



  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <input type="text" value={enteredTask} onChange={taskChangeHandler} />
          <button>Submit</button>
        </form>
        {isLoading && <p>Loading...</p>}
      </Card>
    </div>
  );
};

export default Form;